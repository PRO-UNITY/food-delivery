from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from django.db.models import Q
import requests
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from utils.pagination import Pagination
from utils.pagination import StandardResultsSetPagination
from utils.permission_auth import check_kitchen_permission, check_kitchentwo_permission
from authen.serializers.authen_serializers import UserInformationSerializer
from authen.models import CustomUser
from authen.renderers import UserRenderers
from kitchen.models import Restaurants, EmployeRestaurants
from kitchen.serializer.kitchen_serializers import (
    KitchensSerializer,
    KitchenSerializers,
    EmployeRestaurants,
    KitchensEmployeSerializer,
    KitchensEmployeAddSerializer,
)


def filter_restaurants(queryset, params):
    search_name = params.get("name", None)
    search_description = params.get("description", None)
    search_is_active = params.get("is_active", None)
    search_open = params.get("open_time", None)
    search_close = params.get("close_time", None)
    sort_by = params.get("sort", None)

    if search_name:
        queryset = queryset.filter(Q(name__icontains=search_name))

    if search_is_active:
        queryset = queryset.filter(Q(is_active=search_is_active))

    if search_open:
        queryset = queryset.filter(Q(open_time__gte=search_open))

    if search_close:
        queryset = queryset.filter(Q(close_time__lte=search_close))

    if search_description:
        queryset = queryset.filter(Q(description__icontains=search_description))

    if sort_by == "asc":
        queryset = queryset.order_by("id")
    elif sort_by == "desc":
        queryset = queryset.order_by("-id")

    return queryset


class KitchensView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = KitchensSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["name", "description", "is_active", "open_time", "close_time"]

    def get(self, request, format=None, *args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        url = f"{settings.BASE_URL}"
        headers = {'Authorization': f'Bearer {token}'}
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            user_data = response.json()
            user_id = user_data.get('id')
            queryset = Restaurants.objects.all()
            if user_id:
                queryset = queryset.filter(user=user_id)
            else:
                queryset = self.filter_restaurants(queryset, request.query_params)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_paginated_response(self.serializer_class(page, many=True, context={"request": request}).data)
            else:
                serializer = self.serializer_class(queryset, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            queryset = Restaurants.objects.all()
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_paginated_response(self.serializer_class(page, many=True, context={"request": request}).data)
            else:
                serializer = self.serializer_class(queryset, many=True)
            return Response({"data": serializer.data, 'error': f'Request failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @check_kitchen_permission
    @swagger_auto_schema(request_body=KitchenSerializers)
    def post(self, request, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        expected_fields = set(["name", "logo", "description", "user", "is_active", "open_time", "close_time", "latitude", "longitude",])
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializers = KitchenSerializers(data=request.data, context={"user": user_id})
        if serializers.is_valid(raise_exception=True):
            serializers.save(logo=request.data.get("logo"))
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class KitchenView(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = get_object_or_404(Restaurants, id=pk)
        serializers = KitchensSerializer(objects_list, context={"request": request})
        return Response(serializers.data, status=status.HTTP_200_OK)

    @check_kitchen_permission
    @swagger_auto_schema(request_body=KitchenSerializers)
    def put(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        expected_fields = set(["name", "logo", "description", "user_id", "is_active", "open_time", "close_time", "latitude", "longitude",])
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializers = KitchenSerializers(context={"request": request, "user": user_id}, instance=Restaurants.objects.filter(id=pk)[0], data=request.data, partial=True,)
        if serializers.is_valid(raise_exception=True):
            serializers.save(logo=request.data.get("logo"))
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST,)

    @check_kitchen_permission
    def delete(self, request, pk):
        objects_get = Restaurants.objects.get(id=pk)
        objects_get.delete()
        return Response({"message": "Delete success"}, status=status.HTTP_200_OK)


class KitchenAddManagerView(APIView):
    
    @check_kitchen_permission
    def get(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        token = request.headers.get('Authorization', None)
        url = f"{settings.BASE_URL_MANAGER}"
        headers = {'Authorization': f'Bearer {token}'}
        response = requests.request("GET", url, headers=headers)
        response.raise_for_status()
        delivery_data = response.json()
        user_ids = [user['id'] for user in delivery_data]
        obj = EmployeRestaurants.objects.filter(restaurant=pk, employe__in=user_ids)
        data_list = list(obj.values())
        active_employee_ids = [item['employe'] for item in data_list if 'employe' in item]
        no_active_employees = [user for user in delivery_data if user['id'] not in active_employee_ids]
        serializers = KitchensEmployeSerializer(obj, many=True)
        return Response({'no_active': no_active_employees, 'active': serializers.data}, status=status.HTTP_200_OK)

    @check_kitchen_permission
    @swagger_auto_schema(request_body=KitchensEmployeAddSerializer)
    def post(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        instance=Restaurants.objects.filter(id=pk)[0]
        serializers = KitchensEmployeAddSerializer(data=request.data, context={"restaurant": instance.id})
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @check_kitchen_permission
    @swagger_auto_schema(request_body=KitchensEmployeAddSerializer)
    def delete(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        object_get = EmployeRestaurants.objects.filter(id=pk)
        object_get.delete()
        return Response({'message': 'delete success'}, status=status.HTTP_400_BAD_REQUEST)
