from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from authen.pagination import StandardResultsSetPagination

from authen.models import CustomUser
from managers.serializers import UserInformationSerializers, ManagerSignUpSerializers


class ManagerKitchenViews(APIView):
    """The owner of the kitchen registers the manager"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = UserInformationSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["username", "categories", "kitchen", "price"]

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
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, format=None, *args, **kwargs):
        username = request.query_params.get("username", None)
        sort_by = request.query_params.get("sort", None)
        queryset = CustomUser.objects.filter(groups__name__in=["manager"])

        if username:
            queryset = queryset.filter(Q(username__icontains=username))

        if sort_by == "asc":
            queryset = queryset.order_by("id")
        elif sort_by == "desc":
            queryset = queryset.order_by("-id")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @extend_schema(
        request=ManagerSignUpSerializers,
        responses={201: ManagerSignUpSerializers},
    )
    def post(self, request):
        if request.user.is_authenticated:
            expected_fields = set(
                [
                    "username",
                    "password",
                    "confirm_password",
                    "first_name",
                    "last_name",
                    "email",
                    "groups",
                    "active_profile",
                    "user_id",
                ]
            )
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (
                    f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
                )
                return Response(
                    {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
                )
            serializer = ManagerSignUpSerializers(
                data=request.data, context={"user_id": request.user.id}
            )
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class ManagerKitchenCrudViews(APIView):
    """Adds a manager for the kitchen"""

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
        request=ManagerSignUpSerializers,
        responses={201: ManagerSignUpSerializers},
    )
    def put(self, request, pk):
        if request.user.is_authenticated:
            expected_fields = set(
                [
                    "username",
                    "password",
                    "confirm_password",
                    "first_name",
                    "last_name",
                    "email",
                    "groups",
                    "active_profile",
                    "user_id",
                ]
            )
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (
                    f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
                )
                return Response(
                    {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
                )
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
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


# class ManagerUser(APIView):
#     """Kitchen all manager"""

#     render_classes = [UserRenderers]
#     permission = [IsAuthenticated]

#     @extend_schema(
#         request=UserInformationSerializers,
#         responses={201: UserInformationSerializers},
#     )
#     def get(self, request):
#         queryset = CustomUser.objects.filter(
#             groups__name__in=["manager"], user_id=request.user.id
#         )
#         serializers = UserInformationSerializers(queryset, many=True)
#         return Response(serializers.data, status=status.HTTP_200_OK)
