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


class StatusOrderViews(APIView):
    """ Status orders """
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        objects_list = StatusDelivery.objects.all()
        serializers = StatusSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class RatingOrderViews(APIView):
    """ Order graden """
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        objects_list = Grade.objects.all()
        serializers = RaitingSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class SendViews(APIView):
    """ The user orders the kitchen """
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=OrderSerializers,
        responses={201: OrderSerializers},
    )
    def get(self, request):
        objects_list = Delivery.objects.filter(
            klient=request.user,
            delivery=request.user
        )
        serializers = OrderSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=SendOrderSerializers,
        responses={201: SendOrderSerializers},
    )
    def post(self, request):
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
        objects_list = Delivery.objects.filter(id=pk)
        serializers = OrderSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=SendOrderSerializers,
        responses={201: SendOrderSerializers},
    )
    def put(self, request, pk):
        serializers = SendOrderSerializers(
            instance=Delivery.objects.filter(id=pk)[0], data=request.data, partial=True
        )
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
        )
