from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from kitchen.pagination import StandardResultsSetPagination
from drf_spectacular.utils import extend_schema
from authen.renderers import UserRenderers
from foods.models import Foods
from core.pagination import Pagination
from foods.serializers.foods_serializers import (
    FoodsSerializer,
    FoodSerializer,
)


class FoodsView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = FoodsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["name", "categories", "kitchen", "price", "description"]

    def get(self, request, format=None, *args, **kwargs):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "kitchen":
                    queryset = Foods.objects.filter(kitchen__user=request.user)
                    page = super().paginate_queryset(queryset)
                    if page is not None:
                        serializer = super().get_paginated_response(self.serializer_class(page, many=True, context={'user': request.user.id, "request": request}).data)
                    else:
                        serializer = self.serializer_class(queryset, many=True)
                    return Response({"data": serializer.data}, status=status.HTTP_200_OK)
                elif str(groups[0]) == "users":
                    search_name = request.query_params.get("name", None)
                    search_category = request.query_params.get("category", None)
                    search_restaurant = request.query_params.get("restaurant", None)
                    search_description = request.query_params.get("description", None)
                    price_range = request.query_params.get("price", None)
                    sort_by = request.query_params.get("sort", None)
                    queryset = Foods.objects.all()

                    if search_name:
                        queryset = queryset.filter(Q(name__icontains=search_name))

                    if search_category:
                        queryset = queryset.filter(Q(categories__id__icontains=search_category) | Q(categories__name__icontains=search_category))

                    if search_restaurant:
                        queryset = queryset.filter(Q(kitchen__id__icontains=search_restaurant) | Q(kitchen__name__icontains=search_restaurant))

                    if search_description:
                        queryset = queryset.filter(Q(description__icontains=search_description))

                    if price_range:
                        try:
                            start_price, end_price = map(int, price_range.split(","))
                            queryset = queryset.filter(Q(price__range=(start_price, end_price)))
                        except ValueError:
                            return Response({"error": "Value error, ranger"}, status=status.HTTP_400_BAD_REQUEST)
                    if sort_by == "price_asc":
                        queryset = queryset.order_by("price")
                    elif sort_by == "price_desc":
                        queryset = queryset.order_by("-price")

                    page = super().paginate_queryset(queryset)
                    if page is not None:
                        serializer = super().get_paginated_response(self.serializer_class(page, many=True, context={'user': request.user.id, "request": request}).data)
                    else:
                        serializer = self.serializer_class(queryset, many=True)
                    return Response({"data": serializer.data}, status=status.HTTP_200_OK)

        else:
            search_name = request.query_params.get("name", None)
            search_category = request.query_params.get("category", None)
            search_restaurant = request.query_params.get("restaurant", None)
            search_description = request.query_params.get("description", None)
            price_range = request.query_params.get("price", None)
            sort_by = request.query_params.get("sort", None)
            queryset = Foods.objects.all()

            if search_name:
                queryset = queryset.filter(Q(name__icontains=search_name))

            if search_category:
                queryset = queryset.filter(Q(categories__id__icontains=search_category) | Q(categories__name__icontains=search_category))

            if search_restaurant:
                queryset = queryset.filter(Q(kitchen__id__icontains=search_restaurant) | Q(kitchen__name__icontains=search_restaurant))

            if search_description:
                queryset = queryset.filter(Q(description__icontains=search_description))

            if price_range:
                try:
                    start_price, end_price = map(int, price_range.split(","))
                    queryset = queryset.filter(Q(price__range=(start_price, end_price)))
                except ValueError:
                    return Response({"error": "Value error, ranger"}, status=status.HTTP_400_BAD_REQUEST)
            if sort_by == "price_asc":
                queryset = queryset.order_by("price")
            elif sort_by == "price_desc":
                queryset = queryset.order_by("-price")

            page = super().paginate_queryset(queryset)
            if page is not None:
                serializer = super().get_paginated_response(self.serializer_class(page, many=True, context={'user': request.user.id, "request": request}).data)
            else:
                serializer = self.serializer_class(queryset, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @extend_schema(
        request=FoodSerializer,
        responses={201: FoodSerializer},
    )
    def post(self, request):
        if request.user.is_authenticated:
            expected_fields = set(["name", "food_img", "description", "price", "kitchen", "categories", "create_at", "updated_at"])
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
                return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)

            serializers = FoodSerializer(data=request.data, context={"user": request.user})
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data, status=status.HTTP_201_CREATED)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED,)


class FoodViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = get_object_or_404(Foods, id=pk)
        serializers = FoodsSerializer(objects_list, context={"request": request})
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=FoodSerializer,
        responses={201: FoodSerializer},
    )
    def put(self, request, pk):
        if request.user.is_authenticated:
            expected_fields = set(["name", "food_img", "description", "price", "kitchen", "categories", "create_at", "updated_at"])
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
                return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
            serializers = FoodSerializer(
                context={"user": request.user, "request": request},
                instance=Foods.objects.filter(id=pk)[0],
                data=request.data,
                partial=True,
            )
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data, status=status.HTTP_200_OK)
            return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "kitchen":
                    objects_get = Foods.objects.get(id=pk)
                    objects_get.delete()
                    return Response({"message": "Delete success"}, status=status.HTTP_200_OK)
                return Response({"error": "It is not possible to add information to such a user"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"error": "User does not belong to any role"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)