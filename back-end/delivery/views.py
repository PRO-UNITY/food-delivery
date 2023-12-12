from rest_framework import status
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from django.shortcuts import get_object_or_404
from authen.models import KitchenUser, CustomUser
from delivery.models import Delivery, StatusDelivery, Grade, OrderComent
from delivery.serializers import (
    StatusSerializers,
    GradeSerializers,
    DeliveryChickenSerializers,
    DeliveryListSerializers,
    SendOrderSerializers,
    OrderComentSerializers,
    OrderComentCrudSerializers,
    DeliveryChickenAllSerializers,
    UserInformationSerializers,
)


class StatusDeliveryViews(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        objects_list = StatusDelivery.objects.all()
        serializers = StatusSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class GradeDeliveryViews(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        objects_list = Grade.objects.all()
        serializers = GradeSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class OrderCommnetViews(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        objects_list = OrderComent.objects.all()
        serializers = OrderComentSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=OrderComentCrudSerializers,
        responses={201: OrderComentCrudSerializers},
    )
    def post(self, request):
        serializers = OrderComentCrudSerializers(
            data=request.data,
            context={
                "user": request.user,
            },)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class DeliveryKirchenCreateViews(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request, pk):
        object_list = KitchenUser.objects.filter(id=pk)
        queryset = CustomUser.objects.filter(
            delivery__isnull=True,
            groups__name__in=['delivery'],
            user_id=request.user.id,
            active_profile=True
        )
        serializer = DeliveryChickenAllSerializers(object_list, many=True)
        no_active_delivery = UserInformationSerializers(queryset, many=True)
        return Response(
            {
                'delivery': serializer.data,
                'no_active': no_active_delivery.data},
            status=status.HTTP_200_OK
        )

    @extend_schema(
        request=DeliveryChickenSerializers,
        responses={201: DeliveryChickenSerializers},
    )
    def put(self, request, pk):
        serializers = DeliveryChickenSerializers(
            instance=KitchenUser.objects.filter(
                id=pk)[0],
            data=request.data,
            partial=True,
        )
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
        )


class SendOrderViews(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

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


class AcceptanceOrderDeliveryViews(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def put(self, request, pk):
        num = 2
        current_user = request.user
        order = get_object_or_404(Delivery, id=pk)
        status_delivery_instance = StatusDelivery.objects.get(id=num)
        order.delivery = current_user
        order.status = status_delivery_instance
        order.is_delivery = True
        order.save()
        return Response()


class DeteileOrderViews(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = Delivery.objects.filter(id=pk)
        serializers = DeliveryListSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=SendOrderSerializers,
        responses={201: SendOrderSerializers},
    )
    def put(self, request, pk):
        serializers = SendOrderSerializers(
            instance=Delivery.objects.filter(
                id=pk)[0],
            data=request.data,
            partial=True,
        )
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        objects_get = Delivery.objects.get(id=pk)
        objects_get.delete()
        return Response(
            {"message": "Delete success"}, status=status.HTTP_200_OK)


class ActiveOrderView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        active_delivery = Delivery.objects.filter(
            kitchen__delivery=request.user,
            is_delivery=False
        )
        serializers = DeliveryListSerializers(active_delivery, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class ActiveDeliveryView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        active_delivery = Delivery.objects.filter(
            kitchen__delivery=request.user,
            is_delivery=True
        )
        serializers = DeliveryListSerializers(active_delivery, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class ActiveDeliveryDeteileView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request, pk):
        active_delivery = Delivery.objects.filter(
            id=pk,
            kitchen__delivery=request.user,
            is_delivery=True
        )
        serializers = DeliveryListSerializers(active_delivery, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class DeliveryAcceptView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        active_delivery = Delivery.objects.filter(
            kitchen__delivery=request.user,
            is_active=True
        )
        serializers = DeliveryListSerializers(active_delivery, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class DeliveryNoAcceptView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        active_delivery = Delivery.objects.filter(
            kitchen__delivery=request.user,
            is_active=False
        )
        serializers = DeliveryListSerializers(active_delivery, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class UserActiveOrderView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        active_delivery = Delivery.objects.filter(
            klient=request.user,
            is_active=False
        )
        serializers = DeliveryListSerializers(active_delivery, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class UserAcceptOrderView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        active_delivery = Delivery.objects.filter(
            klient=request.user,
            is_active=True
        )
        serializers = DeliveryListSerializers(active_delivery, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class ManagerActiveView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        active_delivery = Delivery.objects.filter(
            kitchen__delivery=request.user,
            is_active=False
        )
        serializers = DeliveryListSerializers(active_delivery, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
