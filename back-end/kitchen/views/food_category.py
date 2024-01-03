from rest_framework.response import Response
from core.pagination import Pagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from kitchen.pagination import StandardResultsSetPagination
from authen.renderers import UserRenderers
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

    @extend_schema(request=FoodCategorySerializer, responses={201: FoodCategorySerializer})
    def post(self, request):
        if request.user.is_authenticated:
            expected_fields = set(["name", "create_at", "updated_at"])
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (
                    f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
                )
                return Response(
                    {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
                )
            serializers = FoodCategorySerializer(data=request.data, context={"user_id": request.user})
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data, status=status.HTTP_201_CREATED)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)


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

    @extend_schema(request=FoodCategorySerializer, responses={201: FoodCategorySerializer})
    def put(self, request, pk):
        if request.user.is_authenticated:
            expected_fields = set(["name", "create_at", "updated_at"])
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
                return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
            serializers = FoodCategorySerializer(context={"request": request, "user_id": request.user,}, instance=FoodsCategories.objects.filter(id=pk)[0], data=request.data, partial=True)
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data, status=status.HTTP_200_OK)
            return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "admins":
                    objects_get = FoodsCategories.objects.get(id=pk)
                    objects_get.delete()
                    return Response({"message": "Delete success"}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "It is not possible to add information to such a user"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"error": "User does not belong to any role"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)