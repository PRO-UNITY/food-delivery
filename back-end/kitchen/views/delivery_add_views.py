from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from authen.renderers import UserRenderers
from utils.permission_auth import check_kitchen_permission
from authen.models import CustomUser
from authen.serializers.authen_serializers import UserInformationSerializer
from kitchen.models import Restaurants
from kitchen.serializer.kitchen_serializers import KitchensSerializer, KitchenSerializers


class KitchenAddDeliveryman(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @check_kitchen_permission
    def get(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        objects_get = Restaurants.objects.filter(id=pk)
        queryset = CustomUser.objects.filter(user_id=user_id, groups__name__in=["delivery"], active_profile=True, delivery__isnull=True)
        active_deliverman = KitchensSerializer(objects_get, many=True, context={'request': request})
        no_active_deliveryman = UserInformationSerializer(queryset, many=True, context={'request': request})
        return Response({'active_delivery': active_deliverman.data, 'no_active_deliveryman': no_active_deliveryman.data}, status=status.HTTP_200_OK)

    @check_kitchen_permission
    @swagger_auto_schema(request_body=KitchenSerializers)
    def put(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializers = KitchenSerializers(context={"user_get": user_id}, instance=Restaurants.objects.filter(id=pk)[0], data=request.data, partial=True)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)
