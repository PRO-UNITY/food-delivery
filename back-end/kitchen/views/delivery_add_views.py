from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from utils.user_permission import check_kitchen_permission
from authen.models import CustomUser
from authen.serializers.authen_serializers import UserInformationSerializer
from kitchen.models import Restaurants
from kitchen.serializer.kitchen_serializers import KitchensSerializer, KitchenSerializers


class KitchenAddDeliveryman(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @check_kitchen_permission
    @extend_schema(request=UserInformationSerializer, responses={201: UserInformationSerializer})
    def get(self, request, pk):
        objects_get = Restaurants.objects.filter(id=pk)
        queryset = CustomUser.objects.filter(user_id=request.user.id, groups__name__in=["delivery"], active_profile=True, delivery__isnull=True)
        active_deliverman = KitchensSerializer(objects_get, many=True, context={'request': request})
        no_active_deliveryman = UserInformationSerializer(queryset, many=True, context={'request': request})
        return Response({'active_delivery': active_deliverman.data, 'no_active_deliveryman': no_active_deliveryman.data}, status=status.HTTP_200_OK)

    @check_kitchen_permission
    @extend_schema(request=KitchenSerializers, responses={201: KitchenSerializers})
    def put(self, request, pk):
        serializers = KitchenSerializers(context={"user_get": request.user.id}, instance=Restaurants.objects.filter(id=pk)[0], data=request.data, partial=True)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)
