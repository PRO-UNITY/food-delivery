from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from authen.pagination import StandardResultsSetPagination
from authen.models import CustomUser
from authen.serializers.authen_serializers import UserInformationSerializer
from deliveryman.serializers import DeliverySignUpSerializer


class RegisterDelivery(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = UserInformationSerializer

    @extend_schema(
        request=UserInformationSerializer,
        responses={201: UserInformationSerializer},
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
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "kitchen":
                    instance = CustomUser.objects.filter(groups__name__in=["delivery"], user_id=request.user.id)
                    page = self.paginate_queryset(instance)
                    if page is not None:
                        serializer = self.get_paginated_response(
                            self.serializer_class(page, many=True, context={"request": request}).data
                        )
                    else:
                        serializer = self.serializer_class(instance, many=True)
                    return Response({"data": serializer.data}, status=status.HTTP_200_OK)
                return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    @extend_schema(
        request=DeliverySignUpSerializer,
        responses={201: DeliverySignUpSerializer},
    )
    def post(self, request):
        if request.user.is_authenticated:
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
                return Response(
                    {'error': error_message},
                    status=status.HTTP_400_BAD_REQUEST)
            serializer = DeliverySignUpSerializer(
                data=request.data, context={"user_id": request.user.id}
            )
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(
                    serializer.data, status=status.HTTP_201_CREATED)
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class UserDelivery(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=UserInformationSerializer,
        responses={201: UserInformationSerializer},
    )
    def get(self, request, pk):
        queryset = get_object_or_404(CustomUser, id=pk)
        serializers = UserInformationSerializer(queryset, context={'request': request})
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=RegisterDelivery,
        responses={201: RegisterDelivery},
    )
    def put(self, request, pk):
        if request.user.is_authenticated:
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
                return Response(
                    {'error': error_message},
                    status=status.HTTP_400_BAD_REQUEST)
            queryset = get_object_or_404(CustomUser, id=pk)
            serializer = RegisterDelivery(
                context={'request': request},
                instance=queryset,
                data=request.data,
                partial=True,
            )
            if serializer.is_valid(raise_exception=True):
                serializer.save(avatar=request.data.get("avatar"))
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(
                {"error": "update error data"},
                status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    def delete(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "manager":
                    queryset = CustomUser.objects.get(id=pk)
                    queryset.delete()
                    return Response({'message': 'success'}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "This user does not have permission"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
