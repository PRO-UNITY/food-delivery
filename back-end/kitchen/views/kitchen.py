from rest_framework.response import Response
from core.pagination import Pagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from kitchen.pagination import StandardResultsSetPagination
from authen.serializers.authen_serializers import UserInformationSerializer
from authen.models import CustomUser
from authen.renderers import UserRenderers
from kitchen.models import Restaurants
from kitchen.serializer.kitchen_serializers import (
    KitchensSerializer,
    KitchenSerializers,
)


class KitchensView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = KitchensSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["name", "description", "is_active", "open_time", "close_time"]

    def get(self, request, format=None, *args, **kwargs):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "kitchen":
                    queryset = Restaurants.objects.filter(user=request.user)
                    serializer = KitchensSerializer(queryset, many=True, context={'request': request})
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response({"error": "It is not possible to add information to such a user"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            search_name = request.query_params.get("name", None)
            search_description = request.query_params.get("description", None)
            search_is_active = request.query_params.get("is_active", None)
            search_open = request.query_params.get("open_time", None)
            price_close = request.query_params.get("close_time", None)
            sort_by = request.query_params.get("sort", None)
            queryset = Restaurants.objects.all()
            if search_name:
                queryset = queryset.filter(Q(name__icontains=search_name))

            if search_is_active:
                queryset = queryset.filter(Q(is_active=search_is_active))

            if search_open:
                queryset = queryset.filter(Q(open_time__gte=search_open))

            if price_close:
                queryset = queryset.filter(Q(close_time__lte=price_close))

            if search_description:
                queryset = queryset.filter(Q(description__icontains=search_description))

            if sort_by == "asc":
                queryset = queryset.order_by("id")
            elif sort_by == "desc":
                queryset = queryset.order_by("-id")
            page = super().paginate_queryset(queryset)
            if page is not None:
                serializer = super().get_paginated_response(
                    self.serializer_class(page, many=True, context={"request": request}).data
                )
            else:
                serializer = self.serializer_class(queryset, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @extend_schema(request=KitchenSerializers, responses={201: KitchenSerializers})
    def post(self, request):
        if request.user.is_authenticated:
            expected_fields = set(["name", "logo", "description", "user", "is_active", "open_time", "close_time", "latitude", "longitude",])
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
                return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
            serializers = KitchenSerializers(data=request.data, context={"user": request.user})
            if serializers.is_valid(raise_exception=True):
                serializers.save(logo=request.data.get("logo"))
                return Response(serializers.data, status=status.HTTP_201_CREATED)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)


class KitchenView(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = get_object_or_404(Restaurants, id=pk)
        serializers = KitchensSerializer(objects_list, context={"request": request})
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(request=KitchenSerializers, responses={201: KitchenSerializers})
    def put(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "kitchen":
                    expected_fields = set(["name", "logo", "description", "user_id", "is_active", "open_time", "close_time", "latitude", "longitude",])
                    received_fields = set(request.data.keys())

                    unexpected_fields = received_fields - expected_fields
                    if unexpected_fields:
                        error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
                        return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)

                    serializers = KitchenSerializers(context={"request": request, "user": request.user}, instance=Restaurants.objects.filter(id=pk)[0], data=request.data, partial=True)

                    if serializers.is_valid(raise_exception=True):
                        serializers.save(logo=request.data.get("logo"))
                        return Response(serializers.data, status=status.HTTP_200_OK)
                    return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)
                return Response({"error": "User does not belong to any role"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "kitchen":
                    objects_get = Restaurants.objects.get(id=pk)
                    objects_get.delete()
                    return Response({"message": "Delete success"}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "It is not possible to add information to such a user"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"error": "User does not belong to any role"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)


class KitchenAddDeliverymanView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(request=UserInformationSerializer, responses={201: UserInformationSerializer})
    def get(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "kitchen":
                    objects_get = Restaurants.objects.filter(id=pk)
                    queryset = CustomUser.objects.filter(user_id=request.user.id, groups__name__in=["delivery"], active_profile=True, delivery__isnull=True)
                    active_deliverman = KitchensSerializer(objects_get, many=True, context={'request': request})
                    no_active_deliveryman = UserInformationSerializer(queryset, many=True, context={'request': request})
                    return Response({'active_employe': active_deliverman.data, 'no_active_employe': no_active_deliveryman.data}, status=status.HTTP_200_OK)
                return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    @extend_schema(request=KitchenSerializers, responses={201: KitchenSerializers})
    def put(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "kitchen":
                    expected_fields = set(["employes"])
                    received_fields = set(request.data.keys())

                    unexpected_fields = received_fields - expected_fields
                    if unexpected_fields:
                        error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
                        return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
                    serializers = KitchenSerializers(instance=Restaurants.objects.filter(id=pk)[0], context={"user_get": request.user.id}, data=request.data, partial=True)
                    serializers = KitchenSerializers(instance=Restaurants.objects.filter(id=pk)[0], context={"user_get": request.user.id}, data=request.data, partial=True)
                    if serializers.is_valid(raise_exception=True):
                        serializers.save()
                        return Response(serializers.data, status=status.HTTP_200_OK)
                    return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)


class KitchenAddManagerView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(request=UserInformationSerializer, responses={201: UserInformationSerializer})
    def get(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "kitchen":
                    objects_get = Restaurants.objects.filter(id=pk)
                    queryset = CustomUser.objects.filter(user_id=request.user.id, groups__name__in=["manager"], active_profile=True, delivery__isnull=True)
                    active_deliverman = KitchensSerializer(objects_get, many=True, context={'request': request})
                    no_active_deliveryman = UserInformationSerializer(queryset, many=True, context={'request': request})
                    return Response({'active_employe': active_deliverman.data, 'no_active_employe': no_active_deliveryman.data}, status=status.HTTP_200_OK)
                return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    @extend_schema(request=KitchenSerializers, responses={201: KitchenSerializers})
    def put(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "kitchen":
                    expected_fields = set(["employes"])
                    received_fields = set(request.data.keys())

                    unexpected_fields = received_fields - expected_fields
                    if unexpected_fields:
                        error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
                        return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
                    serializers = KitchenSerializers(instance=Restaurants.objects.filter(id=pk)[0], context={"user_get": request.user.id}, data=request.data, partial=True)
                    if serializers.is_valid(raise_exception=True):
                        serializers.save()
                        return Response(serializers.data, status=status.HTTP_200_OK)
                    return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)