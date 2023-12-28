from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authen.renderers import UserRenderers
from authen.models import CustomUser
from authen.serializers.authen_serializers import UserInformationSerializer
from kitchen.models import Restaurants
from kitchen.serializer.kitchen_serializers import KitchensSerializer, KitchenSerializers


class KitchenAddDeliveryman(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(request=UserInformationSerializer, responses={201: UserInformationSerializer})
    def get(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "kitchen":
                    objects_get = Restaurants.objects.filter(id=pk)
                    queryset = CustomUser.objects.filter(user_id=request.user.id, groups__name__in=["delivery"], active_profile=True, delivery__isnull=True)
                    active_deliverman = KitchensSerializer(objects_get, many=True, context={'request': request})
                    no_active_deliveryman = UserInformationSerializer(queryset, many=True, context={'request': request})
                    return Response({'active_delivery': active_deliverman.data, 'no_active_deliveryman': no_active_deliveryman.data}, status=status.HTTP_200_OK)
                return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    @extend_schema(request=KitchenSerializers, responses={201: KitchenSerializers})
    def put(self, request, pk):
        if request.user.is_authenticated:
            serializers = KitchenSerializers(instance=Restaurants.objects.filter(id=pk)[0], data=request.data, partial=True)
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data, status=status.HTTP_200_OK)
            return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
