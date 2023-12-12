from rest_framework import serializers
from authen.models import KitchenUser, CustomUser
from delivery.models import (
    StatusDelivery,
    Delivery,
    Grade,
    OrderComent,
)


class StatusSerializers(serializers.ModelSerializer):
    class Meta:
        model = StatusDelivery
        fields = '__all__'


class GradeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'


class UserInformationSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "phone",
            "active_profile"
        ]


class DeliveryChickenAllSerializers(serializers.ModelSerializer):
    delivery = UserInformationSerializers(many=True, read_only=True)

    class Meta:
        model = KitchenUser
        fields = [
            "id",
            "delivery",
        ]


class DeliveryChickenSerializers(serializers.ModelSerializer):
    class Meta:
        model = KitchenUser
        fields = [
            "id",
            "delivery",
        ]

    def update(self, instance, validated_data):
        deliveries_data = validated_data.pop('delivery')
        instance.delivery.clear()
        for delivery_data in deliveries_data:
            instance.delivery.add(delivery_data)
        instance.save()
        return instance


class StatusDeliveryListSerializers(serializers.ModelSerializer):
    class Meta:
        model = StatusDelivery
        fields = ['id', 'name']


class OrderComentSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderComent
        fields = [
            "decription",
            "grade",
            "user",
            "delivery",
            "create_at",
        ]


class OrderComentCrudSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderComent
        fields = [
            "decription",
            "grade",
            "user",
            "delivery",
            "create_at",
        ]

    def create(self, validated_data):
        order = OrderComent.objects.create(**validated_data)
        order.user = self.context.get("user")
        print(self.context.get("user"))
        order.save()
        return order


class DeliveryListSerializers(serializers.ModelSerializer):
    status = StatusDeliveryListSerializers(read_only=True)
    klient = UserInformationSerializers(read_only=True)
    delivery = UserInformationSerializers(read_only=True)
    order = OrderComentSerializers(many=True,  read_only=True)

    class Meta:
        model = Delivery
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
            "order",
            "total_price",
            "create_at",
            "updated_at"
        ]


class SendOrderSerializers(serializers.ModelSerializer):

    class Meta:
        model = Delivery
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

    def create(self, validated_data):
        send_order = Delivery.objects.create(**validated_data)
        send_order.klient = self.context.get("klient")
        send_order.save()
        return send_order

    def update(self, instance, validated_data):
        instance.status = validated_data.get("status", instance.status)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance
