from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated 
from drf_yasg.utils import swagger_auto_schema
from utils.pagination import StandardResultsSetPagination
from utils.pagination import Pagination
from authen.renderers import UserRenderers
from foods.models import Foods
from kitchen.serializer.food_serializers import KitchenFoodsSerializers


class KitchenFoodsView(APIView, Pagination):
    pagination_class = StandardResultsSetPagination
    serializer_class = KitchenFoodsSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["name", "categories", "kitchen", "price"]

    @swagger_auto_schema(request_body=KitchenFoodsSerializers)
    def get(self, request, format=None, *args, **kwargs):
        search_category = request.query_params.get("category", None)
        search_restaurant = request.query_params.get("restaurant", None)
        sort_by = request.query_params.get("sort", None)
        queryset = Foods.objects.all()
        if search_category:
            queryset = queryset.filter(Q(categories__id__icontains=search_category))
        if search_restaurant:
            queryset = queryset.filter(Q(restaurant__id__icontains=search_restaurant))
        if sort_by == "price_asc":
            queryset = queryset.order_by("id")
        elif sort_by == "price_desc":
            queryset = queryset.order_by("-id")
        page = super().paginate_queryset(queryset)
        if page is not None:
            serializer = super().get_paginated_response({"results": self.serializer_class(page, many=True, context={"request": request}).data, "count": queryset.count(),})
        else:
            serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class KitchenFoodView(APIView, Pagination):
    pagination_class = StandardResultsSetPagination
    serializer_class = KitchenFoodsSerializers

    @swagger_auto_schema(request_body=KitchenFoodsSerializers)
    def get(self, request, pk, format=None, *args, **kwargs):
        instance = Foods.objects.filter(kitchen=pk)
        page = super().paginate_queryset(instance)
        if page is not None:
            serializer = super().get_paginated_response(
                self.serializer_class(page, many=True, context={"user": request.user.id, "request": request},).data)
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class KitchenCategoryFoodsView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = KitchenFoodsSerializers

    @swagger_auto_schema(request_body=KitchenFoodsSerializers)
    def get(self, request, id_category, pk, format=None, *args, **kwargs):
        queryset = Foods.objects.filter(categories=id_category, kitchen=pk)
        page = super().paginate_queryset(queryset)
        if page is not None:
            serializer = super().get_paginated_response(self.serializer_class(page, many=True, context={"user": request.user.id, "request": request},).data)
        else:
            serializer = self.serializer_class(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
