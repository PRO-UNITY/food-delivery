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
    food = FoodsSerializer(many=True, read_only=True)
    delivery = UserInformationSerializer(read_only=True)

    class Meta:
        model = Orders
        fields = ["id", "klient", "kitchen", "food", "price", "is_active", "is_delivery", "is_order", "delivery", "status", "address", "location", "create_at", "updated_at",]


class SendOrderSerializers(serializers.ModelSerializer):
    kitchen = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Orders
        fields = ["id", "klient", "kitchen", "food", "price", "is_active", "is_delivery", "is_order", "delivery", "status", "address", "location", "create_at", "updated_at",]

    def create(self, validated_data):
        food_data = validated_data.pop('food', [])
        kitchen_ids = validated_data.pop('kitchen', [])
        klient = self.context.get("klient")
        orders = []
        for kitchen_id in kitchen_ids:
            order_data = validated_data.copy()
            kitchen_instance = get_object_or_404(Restaurants, id=kitchen_id)
            order_data["kitchen"] = kitchen_instance
            order = Orders.objects.create(**order_data)
            order.klient = klient
            kitchen_food_items = [food.id for food in food_data if food.kitchen_id == kitchen_id]
            order.food.add(*kitchen_food_items)
            total_price = Foods.objects.filter(id__in=kitchen_food_items).aggregate(total_price=Sum('price'))['total_price']
            order.price = total_price
            order.save()
            orders.append(order)
        return orders


    def update(self, instance, validated_data):
        instance.status = validated_data.get("status", instance.status)
        instance.foods = validated_data.get("foods", instance.foods)
        instance.address = validated_data.get("address", instance.address)
        instance.total_price = validated_data.get("total_price", instance.total_price)
        instance.is_delivery = validated_data.get("is_delivery", instance.is_delivery)
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.save()
        return instance
