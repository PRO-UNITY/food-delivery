from drf_spectacular.utils import extend_schema
import requests
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from authen.renderers import UserRenderers
from django.conf import settings
from utils.permission_auth import check_kitchen_permission, fetch_delivery_data
from authen.models import CustomUser
from authen.serializers.authen_serializers import UserInformationSerializer
from kitchen.models import Restaurants, EmployeRestaurants
from kitchen.serializer.kitchen_serializers import KitchensSerializer, KitchenSerializers, KitchensEmployeSerializer, KitchensEmployeAddSerializer


class KitchenAddDeliveryman(APIView):

    @check_kitchen_permission
    def get(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        token = request.headers.get('Authorization', None)
        url = f"{settings.BASE_URL_DELIVERY}"
        headers = {'Authorization': f'Bearer {token}'}
        response = requests.request("GET", url, headers=headers)
        response.raise_for_status()
        delivery_data = response.json()
        user_ids = [user['id'] for user in delivery_data]
        obj = EmployeRestaurants.objects.filter(restaurant=pk, employe__in=user_ids)
        data_list = list(obj.values())
        active_employee_ids = [item['employe'] for item in data_list if 'employe' in item]
        no_active_employees = [user for user in delivery_data if user['id'] not in active_employee_ids]
        serializers = KitchensEmployeSerializer(obj, many=True)
        return Response({'no_active': no_active_employees, 'active': serializers.data}, status=status.HTTP_200_OK)

    @check_kitchen_permission
    @swagger_auto_schema(request_body=KitchensEmployeAddSerializer)
    def post(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        instance=Restaurants.objects.filter(id=pk)[0]
        serializers = KitchensEmployeAddSerializer(data=request.data, context={"restaurant": instance.id})
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @check_kitchen_permission
    @swagger_auto_schema(request_body=KitchensEmployeAddSerializer)
    def delete(self, request, pk, user_id=None):
        if user_id is None:
            return Response({"error": "Invalid user data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        object_get = EmployeRestaurants.objects.filter(id=pk)
        object_get.delete()
        return Response({'message': 'delete success'}, status=status.HTTP_400_BAD_REQUEST)
