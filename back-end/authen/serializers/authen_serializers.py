""" DJango DRF Serializers """
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.contrib.auth.models import Group
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.core.validators import MinLengthValidator, MaxLengthValidator
from authen.models import CustomUser
from django.utils.encoding import (
    force_str,
)
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed


class UserGroupSerizliers(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name"]


class UserSignUpSerializers(serializers.ModelSerializer):
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
    role = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "confirm_password",
            "role"
        ]
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as exc:
            raise serializers.ValidationError(str(exc))
        return value

    def create(self, validated_data):
        if validated_data['password'] != validated_data['confirm_password']:
            raise serializers.ValidationError({"error":"Those passwords don't match"})
        validated_data.pop('confirm_password')
        role_name = validated_data.pop('role', None)
        if role_name == 'admins':
            raise serializers.ValidationError({"error": "You cant to submit this Role"})

        if role_name:
            try:
                role = Group.objects.get(name=role_name)
            except ObjectDoesNotExist:
                raise serializers.ValidationError({'error': "Invalid role"})

        create = get_user_model().objects.create_user(**validated_data)
        create.groups.add(role)

        return create


class KitchenSignUpSerializers(serializers.ModelSerializer):
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
            "groups",
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
        user.set_password(validated_data["password"])
        filtr_gr = Group.objects.filter(id=1)
        for i in filtr_gr:
            user.groups.add(i.id)
            user.save()
        return user


class UserUpdateSerializers(serializers.ModelSerializer):
    """Serializers"""

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

    avatar = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        allow_null=False,
        use_url=False,
        required=False,
    )
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "avatar",
        ]

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.email = validated_data.get("email", instance.email)
        if instance.avatar == None:
            instance.avatar = self.context.get("avatar")
        else:
            instance.avatar = validated_data.get("avatar", instance.avatar)
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

    def validate(self, data):
        # Check for additional keys in the data during a POST request
        if self.context.get("request") and self.context["request"].method == "POST":
            allowed_keys = set(self.fields.keys())
            input_keys = set(data.keys())

            # Check for extra keys in the input data
            extra_keys = input_keys - allowed_keys

            if extra_keys:
                raise serializers.ValidationError(
                    f"Additional keys are not allowed: {', '.join(extra_keys)}"
                )

        return data


class UserInformationSerializers(serializers.ModelSerializer):
    """User Profiles Serializers"""
    role = serializers.SerializerMethodField()

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
            "role"
        ]

    def get_role(self, obj):
        get_name = [roless.name for roless in obj.groups.all()]
        for k in get_name:
            return k


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    default_error_message = {"bad_token": ("Token is expired or invalid")}

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail("bad_token")


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = [
            "email",
        ]


class PasswordResetCompleteSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=8, max_length=32, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")

            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = get_user_model().objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("Invalid link", 401)

            user.set_password(password)
            user.save()
            return user
        except Exception:
            raise AuthenticationFailed("Invalid link", 401)
