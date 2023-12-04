""" DJango DRF Serializers """
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from authen.models import CustomUser, Gender


class AllGenderListSerializers(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = "__all__"


class UserSignUpSerializers(serializers.ModelSerializer):
    username = serializers.CharField(
        max_length=255,
        min_length=5,
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())],
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "password",
            "password2",
            "birth_date",
            "gender_id",
        ]
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            birth_date=validated_data["birth_date"],
            avatar=validated_data["avatar"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserUpdateSerializers(serializers.ModelSerializer):
    """Serializers"""
    avatar = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        allow_null=False,
        use_url=False,
        required=False,
    )
    username = serializers.CharField(
        max_length=255,
        min_length=5,
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())],
    )

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "birth_date",
            "gender_id",
            "avatar",
            "phone",
        ]

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get(
            "first_name", instance.first_name)
        instance.last_name = validated_data.get(
            "last_name", instance.last_name)
        instance.username = validated_data.get("username", instance.username)
        instance.birth_date = validated_data.get(
            "birth_date", instance.birth_date)
        instance.gender_id = validated_data.get(
            "gender_id", instance.gender_id)
        instance.phone = validated_data.get("phone", instance.phone)
        if self.context.get("avatar") == None:
            instance.avatar = instance.avatar
        else:
            instance.avatar = self.context.get("avatar")
        instance.save()
        return instance


class UserSigInInSerializers(serializers.ModelSerializer):
    """Serializers"""

    username = serializers.CharField(max_length=50, min_length=2)
    password = serializers.CharField(max_length=50, min_length=1)

    class Meta:
        model = CustomUser
        fields = ["username", "password"]
        read_only_fields = ("username",)


class UserInformationSerializers(serializers.ModelSerializer):
    """User Profiles Serializers"""

    class Meta:
        """User Model Fileds"""

        model = CustomUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "avatar",
            "birth_date",
            "gender_id",
            "phone",
        ]


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
