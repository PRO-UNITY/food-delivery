from django_filters.rest_framework import DjangoFilterBackend
from utils.pagination import Pagination
from django.db.models import Q
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from utils.pagination import StandardResultsSetPagination
from authen.models import CustomUser
from kitchen.models import Restaurants
from drf_yasg.utils import swagger_auto_schema
from utils.user_permission import (
    check_kitchen_permission,
    check_manager_permission
)
from managers.serializers import (
    UserInformationSerializer,
    ManagerSignUpSerializer,
    KitchensSerializer,
)


class ManagersView(APIView, Pagination):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = UserInformationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["username", "categories", "kitchen", "price"]

    @check_kitchen_permission
    def get(self, request, format=None, *args, **kwargs):
        user = request.user
        username = request.query_params.get("username", None)
        sort_by = request.query_params.get("sort", "asc")
        queryset = CustomUser.objects.filter(groups__name="manager", user_id=user.id)
        if username:
            queryset = queryset.filter(username__icontains=username)
        order_by_field = "id" if sort_by == "asc" else "-id"
        queryset = queryset.order_by(order_by_field)
        page = super().paginate_queryset(queryset)
        serializer = self.serializer_class(page, many=True, context={"request": request}) if page else self.serializer_class(queryset, many=True)
        return super().get_paginated_response(serializer.data)

    @check_kitchen_permission
    @swagger_auto_schema(request_body=ManagerSignUpSerializer)
    def post(self, request):
        expected_fields = set(["username", "password", "confirm_password", "first_name", "last_name", "email", "groups", "active_profile", "user_id", "phone", "latitude", "longitude",])
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ManagerSignUpSerializer(data=request.data, context={"user_id": request.user.id})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ManagerView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request, pk):
        queryset = get_object_or_404(CustomUser, id=pk)
        serializers = UserInformationSerializer(queryset)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @check_kitchen_permission
    @swagger_auto_schema(request_body=ManagerSignUpSerializer)
    def put(self, request, pk):
        expected_fields = set(["username", "password", "confirm_password", "first_name", "last_name", "email", "groups", "active_profile", "user_id", "phone", "latitude", "longitude",])
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        queryset = get_object_or_404(CustomUser, id=pk)
        serializer = ManagerSignUpSerializer(context={"request": request}, instance=queryset, data=request.data, partial=True,)
        if serializer.is_valid(raise_exception=True):
            serializer.save(avatar=request.data.get("avatar"))
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST,)

    @check_kitchen_permission
    def delete(self, request, pk):
        queryset = CustomUser.objects.get(id=pk)
        queryset.delete()
        return Response({"message": "success"}, status=status.HTTP_200_OK)


class ManagerKitchensViews(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @check_manager_permission
    def get(self, request):
        queryset = Restaurants.objects.filter(deliveryman_user=request.user)
        serializers = KitchensSerializer(queryset, many=True, context={"request": request})
        return Response(serializers.data, status=status.HTTP_200_OK)
