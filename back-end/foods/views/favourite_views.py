from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from drf_yasg.utils import swagger_auto_schema
from authen.renderers import UserRenderers
from foods.models import Foods, Favorite
from utils.pagination import StandardResultsSetPagination
from utils.pagination import Pagination
from utils.permission_auth import check_user_permission
from foods.serializers.favourite_serializers import (
    FoodsSerializer,
    FavoritesSerializer,
    FavoriteSerializer,
)


class FoodCategories(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = FoodsSerializer

    @check_user_permission
    def get(self, request, pk, user_id=None, format=None, *args, **kwargs):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        instance = Foods.objects.filter(categories=pk)
        page = super().paginate_queryset(instance)
        if page is not None:
            serializer = super().get_paginated_response(self.serializer_class(page, many=True, context={"user": user_id, "request": request}).data)
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class FavouritesView(APIView, Pagination):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = FavoritesSerializer

    @check_user_permission
    def get(self, request, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        queryset = Favorite.objects.filter(user=user_id, is_favorite=True)
        page = super().paginate_queryset(queryset)
        if page is not None:
            serializer = super().get_paginated_response(self.serializer_class(page, many=True, context={"request": request}).data)
        else:
            serializer = self.serializer_class(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @check_user_permission
    @swagger_auto_schema(request_body=FavoriteSerializer)
    def post(self, request, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializers = FavoriteSerializer(data=request.data, context={"user": user_id})
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class FavouriteViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    @check_user_permission
    def delete(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        objects_get = Favorite.objects.get(food=pk)
        objects_get.delete()
        return Response({"message": "Delete success"}, status=status.HTTP_200_OK)
