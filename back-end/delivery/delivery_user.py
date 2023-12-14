import random
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from authen.models import CustomUser
from delivery.serializers import (
    DeliverySignUpSerializers,
    UserInformationSerializers
)


class RegisterDeliveryViews(APIView):
    """The owner of the kitchen registers the delivery"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=DeliverySignUpSerializers,
        responses={201: DeliverySignUpSerializers},
    )
    def post(self, request):
        serializer = DeliverySignUpSerializers(
            data=request.data, context={"user_id": request.user.id}
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeliveryUser(APIView):
    """Kitchen all delivery"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=UserInformationSerializers,
        responses={201: UserInformationSerializers},
    )
    def get(self, request):
        queryset = CustomUser.objects.filter(
            groups__name__in=["delivery"], user_id=request.user.id
        )
        serializers = UserInformationSerializers(queryset, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class DeliveryUserCrud(APIView):
    """Change delivery information and status"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=DeliverySignUpSerializers,
        responses={201: DeliverySignUpSerializers},
    )
    def put(self, request, pk):
        queryset = get_object_or_404(CustomUser, id=pk)
        serializer = DeliverySignUpSerializers(
            instance=queryset,
            data=request.data,
            partial=True,
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save(avatar=request.data.get("avatar"))
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
        )