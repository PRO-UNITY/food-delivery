from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from utils.renderers import UserRenderers
from utils.user_permission import check_kitchen_permission
from utils.pagination import StandardResultsSetPagination, Pagination
from authentification.models import CustomUser
from authentification.serializers import UserInformationSerializer
from deliveryman.serializers import DeliverySignUpSerializer


class RegisterDelivery(APIView, Pagination):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = UserInformationSerializer

    @check_kitchen_permission
    def get(self, request, format=None, *args, **kwargs):
        user = request.user
        instance = CustomUser.objects.filter(groups__name__in=["delivery"], user_id=user.id)
        page = super().paginate_queryset(instance)
        serializer = self.serializer_class(page, many=True, context={"request": request})
        return super().get_paginated_response(serializer.data)

    @swagger_auto_schema(request_body=DeliverySignUpSerializer)
    def post(self, request):
        expected_fields = [
            "username", "password", "confirm_password", "first_name", "last_name",
            "email", "groups", "active_profile", "user_id", "phone", "latitude", "longitude",
        ]
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - set(expected_fields)
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST) 
        serializer = DeliverySignUpSerializer(data=request.data, context={"user_id": request.user.id})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDelivery(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request, pk):
        queryset = get_object_or_404(CustomUser, id=pk)
        serializer = UserInformationSerializer(queryset, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @check_kitchen_permission
    @swagger_auto_schema(request_body=DeliverySignUpSerializer)
    def put(self, request, pk):
        expected_fields = [
            "username", "password", "confirm_password", "first_name", "last_name",
            "email", "role", "active_profile", "phone", "latitude", "longitude",
        ]
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - set(expected_fields)
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        queryset = get_object_or_404(CustomUser, id=pk)
        serializer = DeliverySignUpSerializer(instance=queryset, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save(avatar=request.data.get("avatar"))
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Update error data"}, status=status.HTTP_400_BAD_REQUEST)

    @check_kitchen_permission
    def delete(self, request, pk):
        queryset = get_object_or_404(CustomUser, id=pk)
        queryset.delete()
        return Response({"message": "Success"}, status=status.HTTP_200_OK)



class DeliveryActive(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @check_kitchen_permission
    def get(self, request, format=None, *args, **kwargs):
        user = request.user
        instance = CustomUser.objects.filter(groups__name__in=["delivery"], user_id=user.id, active_profile=True)
        serializer = UserInformationSerializer(instance, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
