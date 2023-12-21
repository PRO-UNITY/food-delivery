from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from delivery.models import Delivery
from django.shortcuts import get_object_or_404
from authen.pagination import StandardResultsSetPagination
from order.serializers import (
    OrderFoodsSerializers,
    OrderSerializers,
    SendOrderSerializers,
)


class SendViews(APIView):
    """The user orders the kitchen"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = OrderSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "kitchen"]

    @extend_schema(
        request=OrderSerializers,
        responses={201: OrderSerializers},
    )
    @property
    def paginator(self):
        if not hasattr(self, "_paginator"):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        else:
            pass
        return self._paginator

    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, format=None, *args, **kwargs):
        if request.user.is_authenticated:
            search_restaurant = request.query_params.get("restaurant", None)
            search_status = request.query_params.get("status", None)
            sort_by = request.query_params.get("sort", None)
            queryset = Delivery.objects.filter(klient=request.user)

            if search_restaurant:
                queryset = queryset.filter(Q(kitchen__id__icontains=search_restaurant))

            if search_status:
                queryset = queryset.filter(Q(status__id__icontains=search_status))

            if sort_by == "price_asc":
                queryset = queryset.order_by("id")
            elif sort_by == "price_desc":
                queryset = queryset.order_by("-id")
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_paginated_response(
                    self.serializer_class(page, many=True).data
                )
            else:
                serializer = self.serializer_class(queryset, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

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


class OrderCrudViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = OrderFoodsSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["foods"]

    @extend_schema(
        request=SendOrderSerializers,
        responses={201: SendOrderSerializers},
    )
    @property
    def paginator(self):
        if not hasattr(self, "_paginator"):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        else:
            pass
        return self._paginator

    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, pk, format=None, *args, **kwargs):
        search_name = request.query_params.get("foods", None)
        sort_by = request.query_params.get("sort", None)

        queryset = Delivery.objects.filter(id=pk)
        delivery_instance = get_object_or_404(queryset)
        foods_queryset = delivery_instance.foods

        if search_name:
            foods_queryset = [food for food in foods_queryset if food.get("foods", "").lower().find(search_name.lower()) != -1]

        if sort_by == "asc":
            foods_queryset = sorted(foods_queryset, key=lambda x: x.get("id", 0))
        elif sort_by == "desc":
            foods_queryset = sorted(foods_queryset, key=lambda x: x.get("id", 0), reverse=True)

        page = self.paginate_queryset(foods_queryset)
        serializer = OrderFoodsSerializers(page, many=True)
        return self.get_paginated_response(serializer.data)

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
                error_message = (
                    f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
                )
                return Response(
                    {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
                )
            serializers = SendOrderSerializers(
                instance=Delivery.objects.filter(id=pk)[0],
                data=request.data,
                partial=True,
            )
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data, status=status.HTTP_200_OK)
            return Response(
                {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
