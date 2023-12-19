from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from kitchen.pagination import StandardResultsSetPagination
from drf_spectacular.utils import extend_schema
from authen.renderers import UserRenderers
from foods.models import FoodsCategories, Foods
from foods.serializers import (
    AllCategoriesFoodsSerializer,
    CategoriesFoodsCrudSerializer,
    AllFoodsSerializer,
    FoodsCrudSerializer,
)


class AllCategoryViews(APIView):
    """ All categories of kitchen """
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = AllCategoriesFoodsSerializer

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
        instance = FoodsCategories.objects.filter(
            kitchen_id__user_id=request.user.id)
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @extend_schema(
        request=CategoriesFoodsCrudSerializer,
        responses={201: CategoriesFoodsCrudSerializer},
    )
    def post(self, request):
        serializers = CategoriesFoodsCrudSerializer(
            data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class AllFoodsViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        objects_list = Foods.objects.all()
        serializers = AllFoodsSerializer(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=FoodsCrudSerializer,
        responses={201: FoodsCrudSerializer},
    )
    def post(self, request):
        expected_fields = set([
            'name',
            'food_img',
            'description',
            'price',
            'kitchen', 'categories', 'create_at', 'updated_at'])
        received_fields = set(request.data.keys())

        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializers = FoodsCrudSerializer(
            data=request.data, context = {'user': request.user})
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoriesFoodsViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = Foods.objects.filter(categories_id=pk)
        serializers = AllFoodsSerializer(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class KitchenFoodsViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = Foods.objects.filter(kitchen_id=pk)
        serializers = AllFoodsSerializer(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class FoodsCrudViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = Foods.objects.filter(id=pk)
        serializers = AllFoodsSerializer(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=FoodsCrudSerializer,
        responses={201: FoodsCrudSerializer},
    )
    def put(self, request, pk):
        expected_fields = set([
            'name',
            'food_img',
            'description',
            'price',
            'kitchen', 'categories', 'create_at', 'updated_at'])
        received_fields = set(request.data.keys())

        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializers = FoodsCrudSerializer(
            instance=Foods.objects.filter(
                id=pk)[0],
            data=request.data,
            partial=True,
        )
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        objects_get = Foods.objects.get(id=pk)
        objects_get.delete()
        return Response(
            {"message": "Delete success"}, status=status.HTTP_200_OK)
