from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from kitchen.pagination import StandardResultsSetPagination
from authen.renderers import UserRenderers
from kitchen.models import KitchenFoods, KitchenUser
from kitchen.serializers import (
    AllKitchenSerializers,
    KitchenCrudSerializers,
    AllFoodKitchenSerializers,
    FoodKitchenCrudSerializers,
)


class KitchenCreateViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        objects_list = KitchenUser.objects.filter(user_id=request.user.id)
        serializers = AllKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializers = KitchenCrudSerializers(
            data=request.data,
            context={
                "user_id": request.user,
            },)
        if serializers.is_valid(raise_exception=True):
            serializers.save(logo=request.data.get("logo"))
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class KitchenCrudViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = KitchenUser.objects.filter(id=pk)
        serializers = AllKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        serializers = KitchenCrudSerializers(
            instance=KitchenUser.objects.filter(
                id=pk)[0],
            data=request.data,
            partial=True,
        )
        if serializers.is_valid(raise_exception=True):
            serializers.save(logo=request.data.get("logo"))
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        objects_get = KitchenUser.objects.get(id=pk)
        objects_get.delete()
        return Response(
            {"message": "Delete success"}, status=status.HTTP_200_OK)


class AllKitchenViews(APIView):
    pagination_class = StandardResultsSetPagination
    serializer_class = AllKitchenSerializers

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
        instance = KitchenUser.objects.all()
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class KitchenFoodsViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        objects_list = KitchenFoods.objects.filter(user_id=request.user.id)
        serializers = AllFoodKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializers = FoodKitchenCrudSerializers(
            data=request.data,
            context={
                "user_id": request.user,
            },)
        if serializers.is_valid(raise_exception=True):
            serializers.save(image_food=request.data.get("image_food"))
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class KitchenFoodsCrudViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = KitchenFoods.objects.filter(id=pk)
        serializers = AllFoodKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        serializers = FoodKitchenCrudSerializers(
            instance=KitchenFoods.objects.filter(id=pk)[0],
            data=request.data,
            partial=True,
        )
        if serializers.is_valid(raise_exception=True):
            serializers.save(categor_img=request.data.get("categor_img"))
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        objects_get = KitchenFoods.objects.get(id=pk)
        objects_get.delete()
        return Response(
            {"message": "Delete success"}, status=status.HTTP_200_OK)


class AllKitchenFood(APIView):
    pagination_class = StandardResultsSetPagination
    serializer_class = AllFoodKitchenSerializers

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
        instance = KitchenFoods.objects.all()
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class DeteileKitchenFood(APIView):
    def get(self, request, pk):
        objects_list = KitchenFoods.objects.filter(user_id=pk)
        serializers = AllFoodKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
