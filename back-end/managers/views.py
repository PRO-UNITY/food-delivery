
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from authen.models import CustomUser
from managers.serializers import (
    UserInformationSerializers,
    ManagerSignUpSerializers
)


class ManagerKitchenViews(APIView):
    """The owner of the kitchen registers the manager"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=ManagerSignUpSerializers,
        responses={201: ManagerSignUpSerializers},
    )
    def post(self, request):
        serializer = ManagerSignUpSerializers(
            data=request.data, context={"user_id": request.user.id}
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ManagerUser(APIView):
    """Kitchen all manager"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=UserInformationSerializers,
        responses={201: UserInformationSerializers},
    )
    def get(self, request):
        queryset = CustomUser.objects.filter(
            groups__name__in=["manager"], user_id=request.user.id
        )
        serializers = UserInformationSerializers(queryset, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class ManagerKitchenCrudViews(APIView):
    """Adds a manager for the kitchen"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=ManagerSignUpSerializers,
        responses={201: ManagerSignUpSerializers},
    )
    def put(self, request, pk):
        queryset = get_object_or_404(CustomUser, id=pk)
        serializer = ManagerSignUpSerializers(
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
