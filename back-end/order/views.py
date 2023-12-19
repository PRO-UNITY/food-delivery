from rest_framework import status
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from delivery.models import Delivery
from django.shortcuts import get_object_or_404
from authen.pagination import StandardResultsSetPagination
from order.serializers import (
    StatusSerializers,
    RaitingSerializers,
    OrderSerializers,
    SendOrderSerializers,
)


class SendViews(APIView):
    """ The user orders the kitchen """
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = OrderSerializers

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
        return self.paginator.paginate_queryset(
            queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, format=None, *args, **kwargs):
        instance = Delivery.objects.filter()
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @extend_schema(
        request=SendOrderSerializers,
        responses={201: SendOrderSerializers},
    )
    def post(self, request):
        expected_fields = set([
            'klient',
            'delivery',
            'status',
            'foods',
            'kitchen',
            'is_delivery',
            'is_active', 'address', 'total_price', 'create_at', 'updated_at'])
        received_fields = set(request.data.keys())

        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializers = SendOrderSerializers(
            data=request.data,
            context={
                "klient": request.user,
            },)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderCrudViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    @extend_schema(
        request=OrderSerializers,
        responses={201: OrderSerializers},
    )
    def get(self, request, pk):
        objects_list = get_object_or_404(Delivery, id=pk)
        serializers = OrderSerializers(objects_list)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=SendOrderSerializers,
        responses={201: SendOrderSerializers},
    )
    def put(self, request, pk):
        expected_fields = set([
            'klient',
            'delivery',
            'status',
            'foods',
            'kitchen',
            'is_delivery',
            'is_active', 'address', 'total_price', 'create_at', 'updated_at'])
        received_fields = set(request.data.keys())

        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializers = SendOrderSerializers(
            instance=Delivery.objects.filter(id=pk)[0], data=request.data, partial=True
        )
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
        )
