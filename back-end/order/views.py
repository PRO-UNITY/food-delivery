from rest_framework import status
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from order.serializers import (
    SendOrderSerializers
)


class SendViews(APIView):
    """ The user orders the kitchen """
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=SendOrderSerializers,
        responses={201: SendOrderSerializers},
    )
    def post(self, request):
        serializers = SendOrderSerializers(
            data=request.data,
            context={
                "klient": request.user,
            },)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


# class NewsBaseCruddViews(APIView):
#     render_classes = [UserRenderers]
#     perrmisson_class = [IsAuthenticated]

#     def get(self, request, pk, format=None):
#         objects_list = SendViews.objects.filter(id=pk)
#         serializers = NewsListSerializers(objects_list, many=True)
#         return Response(serializers.data, status=status.HTTP_200_OK)

#     def put(self, request, pk, format=None):
#         serializers = NewsSerializers(
#             instance=News.objects.filter(id=pk)[0], data=request.data, partial=True
#         )
#         if serializers.is_valid(raise_exception=True):
#             serializers.save(img=request.data.get("img"))
#             return Response(serializers.data, status=status.HTTP_200_OK)
#         return Response(
#             {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
#         )

#     def delete(self, request, pk, format=None):
#         objects_get = News.objects.get(id=pk)
#         objects_get.delete()
#         return Response({"message": "Delete success"}, status=status.HTTP_200_OK)
