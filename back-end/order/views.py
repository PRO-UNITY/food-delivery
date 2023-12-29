from rest_framework import status
from core.pagination import Pagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from order.models import Orders
from django.shortcuts import get_object_or_404
from authen.pagination import StandardResultsSetPagination
from kitchen.models import Restaurants
from order.serializers import (
    OrderFoodsSerializers,
    OrderSerializers,
    SendOrderSerializers,
)


class SendViews(APIView, Pagination):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = OrderSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "kitchen"]

    def get(self, request, format=None, *args, **kwargs):
        if request.user.is_authenticated:
            search_restaurant = request.query_params.get("restaurant", None)
            search_status = request.query_params.get("status", None)
            sort_by = request.query_params.get("sort", None)
            queryset = Orders.objects.filter(klient=request.user)

            if search_restaurant:
                queryset = queryset.filter(Q(kitchen__id__icontains=search_restaurant))

            if search_status:
                queryset = queryset.filter(Q(status__id__icontains=search_status))

            if sort_by == "price_asc":
                queryset = queryset.order_by("id")
            elif sort_by == "price_desc":
                queryset = queryset.order_by("-id")
            page = super().paginate_queryset(queryset)
            if page is not None:
                serializer = super().get_paginated_response(self.serializer_class(page, many=True).data)
            else:
                serializer = self.serializer_class(queryset, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    @extend_schema(
        request=SendOrderSerializers,
        responses={201: SendOrderSerializers},
    )
    def post(self, request):
        if request.user.is_authenticated:
            expected_fields = set(
                [
                    "klient",
                    "delivery",
                    "status",
                    "foods",
                    "kitchen",
                    "is_delivery",
                    "is_active",
                    "address",
                    "total_price",
                    "create_at",
                    "updated_at",
                ]
            )
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (
                    f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
                )
                return Response(
                    {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
                )
            serializers = SendOrderSerializers(
                data=request.data,
                context={
                    "klient": request.user,
                },
            )
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data, status=status.HTTP_201_CREATED)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class OrderView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk, format=None, *args, **kwargs):
        queryset = get_object_or_404(Orders, id=pk)
        serializer = OrderSerializers(queryset, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    # def get(self, request, pk, format=None, *args, **kwargs):
    #     search_name = request.query_params.get("foods", None)
    #     sort_by = request.query_params.get("sort", None)

    #     queryset = Orders.objects.filter(id=pk)
    #     delivery_instance = get_object_or_404(queryset)
    #     foods_queryset = delivery_instance.foods

    #     if search_name:
    #         foods_queryset = [food for food in foods_queryset if food.get("foods", "").lower().find(search_name.lower()) != -1]

    #     if sort_by == "asc":
    #         foods_queryset = sorted(foods_queryset, key=lambda x: x.get("id", 0))
    #     elif sort_by == "desc":
    #         foods_queryset = sorted(foods_queryset, key=lambda x: x.get("id", 0), reverse=True)

    #     page = super().paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = super().get_paginated_response(self.serializer_class(page, many=True).data)
    #     else:
    #         serializer = self.serializer_class(queryset, many=True)
    #         return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @extend_schema(
        request=SendOrderSerializers,
        responses={201: SendOrderSerializers},
    )
    def put(self, request, pk):
        if request.user.is_authenticated:
            expected_fields = set(
                [
                    "klient",
                    "delivery",
                    "status",
                    "foods",
                    "kitchen",
                    "is_delivery",
                    "is_active",
                    "address",
                    "total_price",
                    "create_at",
                    "updated_at",
                ]
            )
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
                return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
            serializers = SendOrderSerializers(
                instance=Orders.objects.filter(id=pk)[0],
                data=request.data,
                partial=True,
            )
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data, status=status.HTTP_200_OK)
            return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED,)


class OrderHistoryKitchenView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = OrderSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["delivery", 'status', 'kitchen']

    def get(self, request, format=None, *args, **kwargs):
        if request.user.is_authenticated:
            search_delivery = request.query_params.get("delivery", None)
            search_status = request.query_params.get("status", None)
            search_kitchen = request.query_params.get("kitchen", None)
            sort_by = request.query_params.get("sort", None)
            queryset = Orders.objects.all()
            # kitchen = list([kitchen_ids['kitchen'] for kitchen_ids in food])
            # filter_kitchen_user = Restaurants.objects.filter(user=request.user.id).values_list('id', flat=True)
            # if set(kitchen) & set(filter_kitchen_user):
            #     print(kitchen)
            if search_delivery:
                queryset = queryset.filter(Q(delivery__id__icontains=search_delivery) | Q(delivery__username__icontains=search_delivery))

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
                serializer = self.serializer_class(page, many=True)
                return super().get_paginated_response(serializer.data)
            else:
                serializer = self.serializer_class(queryset, many=True)
                return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)


class OrderHistoryuserView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = OrderSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'kitchen']

    def get(self, request, format=None, *args, **kwargs):
        if request.user.is_authenticated:
            search_status = request.query_params.get("status", None)
            search_kitchen = request.query_params.get("kitchen", None)
            sort_by = request.query_params.get("sort", None)
            queryset = Orders.objects.filter(klient=request.user.id)

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
                serializer = self.serializer_class(page, many=True)
                return super().get_paginated_response(serializer.data)
            else:
                serializer = self.serializer_class(queryset, many=True)
                return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)