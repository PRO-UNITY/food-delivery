from rest_framework import serializers
from order.models import OrderStatus, Orders
from kitchen.models import Restaurants
from foods.models import Foods
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from authen.serializers.authen_serializers import UserInformationSerializer
import json


class KitchensSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Restaurants
        fields = ["id", "name"]


class StatusSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = "__all__"


class FoodsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Foods
        fields = ["id", "name", "food_img", "description", "price", "kitchen", "categories", "favorite", "create_at", "updated_at",]


class OrderSerializers(serializers.ModelSerializer):
    delivery = UserInformationSerializer(read_only=True)
    klient = UserInformationSerializer(read_only=True)
    status = StatusSerializers(read_only=True)

    class Meta:
        model = Orders
        fields = ["id", "klient", "food", "is_active", "is_delivery", "delivery", "status", "address", "location", "create_at", "updated_at"]


class SendOrderSerializers(serializers.ModelSerializer):


    class Meta:
        model = Orders
        fields = ["id", "klient", "is_active", "is_delivery", "delivery", "status", "address", "location", "create_at", "updated_at"]

class SendOrderSerializers(serializers.ModelSerializer):
    order = serializers.JSONField()

    class Meta:
        model = Orders
        fields = ["id", "klient", "order","food", "is_active", "is_delivery", "delivery", "status", "address", "location", "create_at", "updated_at"]

    def create(self, validated_data):
        order_items = validated_data.get('order')
        status = validated_data.get('status')
        klient = self.context.get('klient')
        kitchen_dict = {}
        for item in order_items:
            kitchen_id = item.get('kitchen')['id']
            food_name = item.get('name')
            food_price = item.get('totalPrice')
            food_count = item.get('count', {}).get('count', 1)
            if kitchen_id not in kitchen_dict:
                kitchen_dict[kitchen_id] = {'kitchen': kitchen_id, 'food': []}

            kitchen_dict[kitchen_id]['food'].append({'name': food_name, 'count': food_count, "price": food_price})
        orders = []
        for kitchen_id, kitchen_data in kitchen_dict.items():
            restoran = Restaurants.objects.get(id=kitchen_id)
            order = Orders.objects.create(food=kitchen_data['food'], kitchen=restoran, klient=klient, status=status)
            orders.append(order)

        return orders

    def update(self, instance, validated_data):
        instance.status = validated_data.get("status", instance.status)
        instance.address = validated_data.get("address", instance.address)
        instance.is_delivery = validated_data.get("is_delivery", instance.is_delivery)
        instance.delivery = validated_data.get("delivery", instance.delivery)
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.save()
        return instance
