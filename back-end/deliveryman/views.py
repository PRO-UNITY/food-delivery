from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from authen.pagination import StandardResultsSetPagination
from authen.models import CustomUser
from delivery.serializers import (
    DeliverySignUpSerializers,
    UserInformationSerializers
)


class RegisterDeliveryViews(APIView):
    """The owner of the kitchen registers the delivery"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = UserInformationSerializers

    @extend_schema(
        request=UserInformationSerializers,
        responses={201: UserInformationSerializers},
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
        instance = CustomUser.objects.filter(
            groups__name__in=["delivery"]
        )
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @extend_schema(
        request=DeliverySignUpSerializers,
        responses={201: DeliverySignUpSerializers},
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
        queryset = CustomUser.objects.filter(groups__name__in=["delivery"])
        serializers = UserInformationSerializers(queryset, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class DeliveryUserCrud(APIView):
    """Change delivery information and status"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=UserInformationSerializers,
        responses={201: UserInformationSerializers},
    )
    def get(self, request, pk):
        queryset = get_object_or_404(CustomUser, id=pk)
        serializers = UserInformationSerializers(queryset)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=DeliverySignUpSerializers,
        responses={201: DeliverySignUpSerializers},
    )
    def put(self, request, pk):
        expected_fields = set([
            'username',
            'password',
            'confirm_password',
            'first_name',
            'last_name', 'email', 'role', 'active_profile', 'user_id'])
        received_fields = set(request.data.keys())

        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
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
