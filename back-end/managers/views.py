
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
        request=UserInformationSerializers,
        responses={201: UserInformationSerializers},
    )
    def get(self, request):
        queryset = CustomUser.objects.filter(groups__name__in=["manager"])
        serializers = UserInformationSerializers(queryset, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=ManagerSignUpSerializers,
        responses={201: ManagerSignUpSerializers},
    )
    def post(self, request):
        expected_fields = set([
            'username',
            'password',
            'confirm_password',
            'first_name',
            'last_name', 'email', 'groups', 'active_profile', 'user_id'])
        received_fields = set(request.data.keys())

        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
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
        expected_fields = set([
            'username',
            'password',
            'confirm_password',
            'first_name',
            'last_name', 'email', 'groups', 'active_profile', 'user_id'])
        received_fields = set(request.data.keys())

        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
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
