from rest_framework.response import Response
from django.db.models import Count
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from kitchen.pagination import StandardResultsSetPagination
from authen.renderers import UserRenderers
from authen.models import KitchenUser
from foods.models import FoodsCategories, Foods
from apps.serializers import (
    KitchenUserWithCounterSerializer,
    AllKitchenKetegories,
    AllFoodsSerializers,
)


class AllKtchenViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = KitchenUserWithCounterSerializer

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
        instance = KitchenUser.objects.annotate(like_count=Count('kitchenlike')).order_by('-like_count')
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class AllKitchenCategoriesiews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = FoodsCategories.objects.filter(kitchen_id=pk).order_by('id')
        serializers = AllKitchenKetegories(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class FoodsKitchenViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = Foods.objects.filter(kitchen_id=pk).order_by('id')
        serializers = AllFoodsSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class FoodsCategoriesViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = Foods.objects.filter(categories_id=pk).order_by('id')
        serializers = AllFoodsSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

# class LikeKitchenViews(APIView):
#     render_classes = [UserRenderers]
#     perrmisson_class = [IsAuthenticated]

#     def get(self, request, pk):
#         objects_list = Foods.objects.filter(kitchen_id=pk).order_by('id')
#         serializers = AllFoodsSerializers(objects_list, many=True)
#         return Response(serializers.data, status=status.HTTP_200_OK)