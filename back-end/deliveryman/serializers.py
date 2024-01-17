from rest_framework import serializers
from django.core.validators import MinLengthValidator, MaxLengthValidator
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import Group
from authen.models import CustomUser


class DeliverySignUpSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        max_length=50,
        validators=[
            MinLengthValidator(limit_value=5, message="First name must be at least 5 characters."),
            MaxLengthValidator(limit_value=50, message="First name cannot exceed 50 characters.")])
    last_name = serializers.CharField(
        max_length=50,
        validators=[
            MinLengthValidator(limit_value=5, message="Last name must be at least 5 characters."),
            MaxLengthValidator(limit_value=50, message="Last name cannot exceed 50 characters.")])
    username = serializers.CharField(max_length=255, min_length=5, required=True, validators=[UniqueValidator(queryset=CustomUser.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(validators=[UniqueValidator(queryset=CustomUser.objects.all())])

    class Meta:
        model = CustomUser
        fields = ["id", "username", "first_name", "last_name", "password", "active_profile", "confirm_password", "email", "phone", "latitude", "longitude"]
        extra_kwargs = {"first_name": {"required": True}, "last_name": {"required": True}}

    def create(self, validated_data):
        if validated_data["password"] != validated_data["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match.")
        user = CustomUser.objects.create(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone=validated_data["phone"],
            email=validated_data["email"],
            latitude=validated_data["latitude"],
            longitude=validated_data["longitude"],
        )
        user.user_id = self.context.get("user_id")
        user.set_password(validated_data["password"])
        filtr_gr = Group.objects.filter(id=5)
        for i in filtr_gr:
            user.groups.add(i.id)
            user.save()
        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.latitude = validated_data.get("latitude", instance.latitude)
        instance.longitude = validated_data.get("longitude", instance.longitude)
        instance.email = validated_data.get("email", instance.email)
        instance.active_profile = validated_data.get("active_profile", instance.active_profile)
        instance.save()
        return instance
