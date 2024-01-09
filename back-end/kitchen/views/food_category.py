from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from utils.pagination import Pagination
from utils.pagination import StandardResultsSetPagination
from authen.renderers import UserRenderers
from utils.permission_auth import check_admin_permission
from foods.models import Foods, FoodsCategories
from foods.serializers.favourite_serializers import CategoriesSerializer
from kitchen.serializer.category_serializers import (
    KitchenKategorySerializer,
    FoodCategorySerializer,
    KitchenFoodsSerializers,
)


class KitchenCategoryView(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = set(Foods.objects.filter(kitchen=pk).distinct("categories__id"))
        serializers = KitchenKategorySerializer(objects_list, many=True, context={"request": request})
        return Response(serializers.data, status=status.HTTP_200_OK)


class FoodCategoriesView(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        objects_list = FoodsCategories.objects.all()
        serializers = CategoriesSerializer(objects_list, many=True, context={"request": request})
        return Response(serializers.data, status=status.HTTP_200_OK)

    @check_admin_permission
    @swagger_auto_schema(request_body=FoodCategorySerializer)
    def post(self, request, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        expected_fields = set(["name", "create_at", "updated_at"])
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializers = FoodCategorySerializer(data=request.data, context={"user_id": user_id})
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class FoodCategoryView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = KitchenFoodsSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["name", "kitchen"]

    def get(self, request, pk, format=None, *args, **kwargs):
        search_name = request.query_params.get("q", None)
        search_restaurant = request.query_params.get("restaurant", None)
        sort_by = request.query_params.get("sort", None)
        queryset = Foods.objects.filter(categories=pk)
        if search_name:
            queryset = queryset.filter(Q(name__icontains=search_name))
        if search_restaurant:
            queryset = queryset.filter(Q(restaurant__id__icontains=search_restaurant))
        if sort_by == "asc":
            queryset = queryset.order_by("price")
        elif sort_by == "desc":
            queryset = queryset.order_by("-price")
        page = super().paginate_queryset(queryset)
        if page is not None:
            serializer = super().get_paginated_response(self.serializer_class(page, many=True, context={"user": request.user, "request": request}).data)
        else:
            serializer = self.serializer_class(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @check_admin_permission
    @swagger_auto_schema(request_body=FoodCategorySerializer)
    def put(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        expected_fields = set(["name", "create_at", "updated_at"])
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializers = FoodCategorySerializer(context={"request": request, "user_id": user_id,}, instance=FoodsCategories.objects.filter(id=pk)[0], data=request.data, partial=True,)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)

    @check_admin_permission
    def delete(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        objects_get = FoodsCategories.objects.get(id=pk)
        objects_get.delete()
        return Response({"message": "Delete success"}, status=status.HTTP_200_OK)
