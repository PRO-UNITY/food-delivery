from rest_framework import status
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from delivery.models import Delivery, StatusDelivery, Grade
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

    @extend_schema(
        request=OrderSerializers,
        responses={201: OrderSerializers},
    )
    def get(self, request):
        objects_list = Delivery.objects.all()
        serializers = OrderSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

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
        status_list = StatusDelivery.objects.all()
        objects_list = Delivery.objects.filter(id=pk)
        rating_list = Grade.objects.all()

        raiting_serializers = RaitingSerializers(rating_list, many=True)
        serializers = OrderSerializers(objects_list, many=True)
        serializers_status = StatusSerializers(status_list, many=True)
        return Response(
            {'order': serializers.data,
             'status': serializers_status.data,
             'rating': raiting_serializers.data},
             status=status.HTTP_200_OK)

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
