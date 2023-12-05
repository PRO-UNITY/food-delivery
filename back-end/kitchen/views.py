from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
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
        objects_list = KitchenUser.objects.filter(id=pk, user_id=request.user.id)
        serializers = AllKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        serializers = KitchenCrudSerializers(
            instance=KitchenUser.objects.filter(
                id=pk, user_id=request.user.id)[0],
            data=request.data,
            partial=True,
        )
        if serializers.is_valid(raise_exception=True, user_id=request.user.id):
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
    def get(self, request):
        objects_list = KitchenUser.objects.all()
        serializers = AllKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


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
    def get(self, request):
        objects_list = KitchenFoods.objects.all()
        serializers = AllFoodKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class DeteileKitchenFood(APIView):
    def get(self, request, pk):
        objects_list = KitchenFoods.objects.filter(user_id=pk)
        serializers = AllFoodKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
