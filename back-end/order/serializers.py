from rest_framework import serializers
from order.models import OrderStatus, Orders


class StatusSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = '__all__'


class OrderSerializers(serializers.ModelSerializer):

    class Meta:
        model = Orders
        fields = [
            "id",
            "klient",
            "delivery",
            "status",
            "foods",
            "kitchen",
            "is_delivery",
            "is_active",
            "address",
            "latitude",
            "longitude",
            "total_price",
            "create_at",
            "updated_at"
        ]


class OrderFoodsSerializers(serializers.ModelSerializer):

    class Meta:
        model = Orders
        fields = [
            "id",
            "foods",
            "klient",
            "delivery",
            "status",
            "foods",
            "kitchen",
            "is_delivery",
            "is_active",
            "address",
            "latitude",
            "longitude",
            "total_price",
            "create_at",
            "updated_at"
        ]


class SendOrderSerializers(serializers.ModelSerializer):

    class Meta:
        model = Orders
        fields = [
            "id",
            "klient",
            "delivery",
            "status",
            "foods",
            "kitchen",
            "is_delivery",
            "is_active",
            "address",
            "total_price",
            "create_at",
            "updated_at"
        ]

    def create(self, validated_data):
        send_order = Orders.objects.create(**validated_data)
        send_order.klient = self.context.get("klient")
        send_order.save()
        return send_order

    def update(self, instance, validated_data):
        instance.status = validated_data.get("status", instance.status)
        instance.foods = validated_data.get("foods", instance.foods)
        instance.address = validated_data.get("address", instance.address)
        instance.total_price = validated_data.get(
            "total_price", instance.total_price)
        instance.is_delivery = validated_data.get(
            "is_delivery", instance.is_delivery)
        instance.is_active = validated_data.get(
            "is_active", instance.is_active)
        instance.save()
        return instance
