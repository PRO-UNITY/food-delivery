from rest_framework import serializers
from django.core.validators import MinLengthValidator, MaxLengthValidator
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import Group
from authen.models import KitchenUser, CustomUser
from delivery.models import (
    StatusDelivery,
    Delivery,
    Grade,
    OrderComent,
)


class DeliverySignUpSerializers(serializers.ModelSerializer):
    first_name = serializers.CharField(
        max_length=50,
        validators=[
            MinLengthValidator(
                limit_value=5, message="First name must be at least 5 characters."
            ),
            MaxLengthValidator(
                limit_value=50, message="First name cannot exceed 50 characters."
            ),
        ],
    )
    last_name = serializers.CharField(
        max_length=50,
        validators=[
            MinLengthValidator(
                limit_value=5, message="Last name must be at least 5 characters."
            ),
            MaxLengthValidator(
                limit_value=50, message="Last name cannot exceed 50 characters."
            ),
        ],
    )
    username = serializers.CharField(
        max_length=255,
        min_length=5,
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())],
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    confirm_password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "password",
            "confirm_password",
            "active_profile",
            "email",
        ]
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def create(self, validated_data):
        if validated_data["password"] != validated_data["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match.")
        user = CustomUser.objects.create(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
        )
        user.user_id = self.context.get("user_id")
        user.set_password(validated_data["password"])
        filtr_gr = Group.objects.filter(id=4)
        for i in filtr_gr:
            user.groups.add(i.id)
            user.save()
        return user

    def update(self, instance, validated_data):
        instance.active_profile = validated_data.get(
            "active_profile", instance.active_profile
        )
        instance.save()
        return instance


class UserGroupSerizliers(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name"]


class UserInformationSerializers(serializers.ModelSerializer):
    """User Profiles Serializers"""

    groups = UserGroupSerizliers(many=True, read_only=True)

    class Meta:
        """User Model Fileds"""

        model = CustomUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "avatar",
            "email",
            "phone",
            "user_id",
            "groups",
            "active_profile",
        ]


class StatusSerializers(serializers.ModelSerializer):
    class Meta:
        model = StatusDelivery
        fields = '__all__'


class GradeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'


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

    def update(self, instance, validated_data):
        instance.status = validated_data.get("status", instance.status)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance


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