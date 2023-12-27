from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from kitchen.pagination import StandardResultsSetPagination
from drf_spectacular.utils import extend_schema
from authen.renderers import UserRenderers
from foods.models import Foods, Favorite
from core.pagination import Pagination
from foods.serializers.foods_serializers import (
    FoodsSerializer,
    FavoritesSerializer,
    FavoriteSerializer,
)


class FoodCategories(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = FoodsSerializer

    def get(self, request, pk, format=None, *args, **kwargs):
        instance = Foods.objects.filter(categories=pk)
        page = super().paginate_queryset(instance)
        if page is not None:
            serializer = super().get_paginated_response(self.serializer_class(page, many=True, context={"request": request}).data)
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class FavouritesView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = FavoritesSerializer

    def get(self, request):
        if request.user.is_authenticated:
            queryset = Favorite.objects.filter(user=request.user.id, is_favorite=True)

            page = super().paginate_queryset(queryset)
            if page is not None:
                serializer = super().get_paginated_response(self.serializer_class(page, many=True, context={"request": request}).data)
            else:
                serializer = self.serializer_class(queryset, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    @extend_schema(request=FavoriteSerializer, responses={201: FavoriteSerializer})
    def post(self, request):
        if request.user.is_authenticated:
            serializers = FavoriteSerializer(data=request.data, context={"user": request.user})
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data, status=status.HTTP_201_CREATED)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)


class FavouriteViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def delete(self, request, pk):
        if request.user.is_authenticated:
            objects_get = Favorite.objects.get(food=pk)
            objects_get.delete()
            return Response({"message": "Delete success"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED,)
