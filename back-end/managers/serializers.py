""" DJango DRF Serializers """
from rest_framework import serializers
from django.contrib.auth.models import Group
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.core.validators import MinLengthValidator, MaxLengthValidator
from authen.models import CustomUser
from kitchen.models import Restaurants


class UserGroupSerizliers(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name"]


class UserInformationSerializers(serializers.ModelSerializer):
    """User Profiles Serializers"""

    role = serializers.SerializerMethodField()
    avatar = serializers.ImageField(max_length=None, use_url=True)

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
            "role",
            "active_profile",
            "phone",
            "latitude",
            "longitude",
        ]

    def get_role(self, obj):
        get_name = [roless.name for roless in obj.groups.all()]
        for k in get_name:
            return k


class ManagerSignUpSerializers(serializers.ModelSerializer):
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
            "email",
            "active_profile",
            "phone",
            "latitude",
            "longitude",
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
        filtr_gr = Group.objects.filter(id=5)
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


class AllKitchenSerializers(serializers.ModelSerializer):
    logo = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Restaurants
        fields = [
            "id",
            "name",
            "description",
            "logo",
            "is_active",
            "open_time",
            "close_time",
            "latitude",
            "longitude",
            "create_at",
            "updated_at",
        ]
