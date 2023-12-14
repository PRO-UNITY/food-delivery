from rest_framework import serializers
from delivery.models import Delivery


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
