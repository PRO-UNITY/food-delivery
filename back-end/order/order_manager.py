from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from authen.renderers import UserRenderers
from order.models import Orders
from utils.pagination import Pagination
from utils.pagination import StandardResultsSetPagination
from utils.user_permission import check_manager_permission
from order.serializers import (
    OrderSerializers,
    SendOrderSerializers,
)


class OrderActiveManagerView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = OrderSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "kitchen"]

    @check_manager_permission
    def get(self, request, format=None, *args, **kwargs):
        search_kitchen = request.query_params.get("kitchen", None)
        sort_by = request.query_params.get("sort", None)
        queryset = Orders.objects.filter(kitchen__employes__id=request.user.id, is_delivery=True, is_active=False).order_by('-id')
        print(queryset)
        if search_kitchen:
            queryset = queryset.filter(Q(kitchen__id__icontains=search_kitchen) | Q(kitchen__name__icontains=search_kitchen))
        if sort_by == "asc":
            queryset = queryset.order_by("id")
        elif sort_by == "desc":
            queryset = queryset.order_by("-id")
        page = super().paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return super().get_paginated_response(serializer.data)
        else:
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class OrderHistoryManagerView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = OrderSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "kitchen"]

    @check_manager_permission
    def get(self, request, format=None, *args, **kwargs):
        search_status = request.query_params.get("status", None)
        search_kitchen = request.query_params.get("kitchen", None)
        sort_by = request.query_params.get("sort", None)
        queryset = Orders.objects.filter(kitchen__employes=request.user.id, is_active=True, is_delivery=True).order_by('-id')
        if search_status:
            queryset = queryset.filter(Q(status__id__icontains=search_status) | Q(status__name__icontains=search_status))
        if search_kitchen:
            queryset = queryset.filter(Q(kitchen__id__icontains=search_kitchen) | Q(kitchen__name__icontains=search_kitchen))
        if sort_by == "asc":
            queryset = queryset.order_by("id")
        elif sort_by == "desc":
            queryset = queryset.order_by("-id")
        page = super().paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer_class(page, many=True, context={'user': request.user.id})
            return super().get_paginated_response(serializer.data)
        else:
            serializer = self.serializer_class(queryset, many=True, context={'user': request.user.id})
            return Response(serializer.data, status=status.HTTP_200_OK)


class OrderAcceptManagerView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk, format=None, *args, **kwargs):
        queryset = get_object_or_404(Orders, kitchen__employes=request.user.id, id=pk)
        serializer = OrderSerializers(queryset, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @check_manager_permission
    @swagger_auto_schema(request_body=SendOrderSerializers)
    def put(self, request, pk):
        expected_fields = set(["id", "klient", "kitchen", "food", "price", "is_active", "is_delivery", "is_order", "delivery", "status", "address", "location", "create_at", "updated_at",])
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializers = SendOrderSerializers(instance=Orders.objects.filter(id=pk)[0], data=request.data, partial=True,)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)


class OrderActiveManagerView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = OrderSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "kitchen"]

    @check_manager_permission
    def get(self, request, format=None, *args, **kwargs):
        search_kitchen = request.query_params.get("kitchen", None)
        sort_by = request.query_params.get("sort", None)
        queryset = Orders.objects.filter(kitchen__employes__id=request.user.id, is_delivery=True, is_active=False).order_by('-id')
        print(queryset)
        if search_kitchen:
            queryset = queryset.filter(Q(kitchen__id__icontains=search_kitchen) | Q(kitchen__name__icontains=search_kitchen))
        if sort_by == "asc":
            queryset = queryset.order_by("id")
        elif sort_by == "desc":
            queryset = queryset.order_by("-id")
        page = super().paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return super().get_paginated_response(serializer.data)
        else:
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)