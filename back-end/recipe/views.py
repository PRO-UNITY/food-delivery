""" Django DRF Views Settings """
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from authen.renderers import UserRenderers
from recipe.models import (
    FoodCategories,
    Foods,
    FoodFiles,
)
from recipe.serializers import (
    AllFoodCategoriesSerializers,
    FoodCategoriesCrudSerializers,
    FoodAllSerializers,
    FoodCrudSerializers,
    FoodFilesCrudSerializers,
    FoodFilesAllSerializers,
)


# Food Categories serializers
class FoodCategoriesAllViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        objects_list = FoodCategories.objects.all()
        serializers = AllFoodCategoriesSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializers = FoodCategoriesCrudSerializers(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save(categor_img=request.data.get("categor_img"))
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class FoodCategoriesCrudViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = FoodCategories.objects.filter(id=pk)
        serializers = AllFoodCategoriesSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        serializers = FoodCategoriesCrudSerializers(
            instance=FoodCategories.objects.filter(id=pk)[0],
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
        objects_get = FoodCategories.objects.get(id=pk)
        objects_get.delete()
        return Response({"message": "Delete success"}, status=status.HTTP_200_OK)


# Food Views
class MyPostFoodAllViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        objects_list = Foods.objects.filter(user_id=request.user.id)
        serializers = FoodAllSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class FoodAllViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        objects_list = Foods.objects.all()
        serializers = FoodAllSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializers = FoodCrudSerializers(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save(food_files=request.data.get("food_files"))
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class FoodAllViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        objects_list = Foods.objects.all()
        serializers = FoodAllSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class FoodsCrudViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = Foods.objects.filter(id=pk)
        # x = 1
        # like = Foods.objects.filter(id=pk).update(like+=1)
        serializers = FoodAllSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        serializers = FoodCrudSerializers(
            instance=Foods.objects.filter(id=pk)[0],
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
        return Response({"message": "Delete success"}, status=status.HTTP_200_OK)


class FoodFilesCrudViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = FoodFiles.objects.filter(food_id=pk)
        serializers = FoodFilesAllSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        serializers = FoodFilesCrudSerializers(
            instance=FoodFiles.objects.filter(id=pk)[0],
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
        objects_get = FoodFiles.objects.get(id=pk)
        objects_get.delete()
        return Response({"message": "Delete success"}, status=status.HTTP_200_OK)
