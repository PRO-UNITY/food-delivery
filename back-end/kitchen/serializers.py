from rest_framework import serializers
from authen.models import CustomUser
from kitchen.models import Restaurants
from foods.models import FoodsCategories, Foods


class UserInformationSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "first_name", "last_name", "email"]


class AllKitchenSerializers(serializers.ModelSerializer):
    deliveryman_user = UserInformationSerializers(many=True, read_only=True)
    logo = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Restaurants
        fields = [
            "id",
            "name",
            "description",
            "logo",
            "user",
            "is_active",
            "deliveryman_user",
            "open_time",
            "close_time",
            "latitude",
            "longitude",
            "create_at",
            "updated_at",
        ]


class KitchenCrudSerializers(serializers.ModelSerializer):
    logo = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        allow_null=False,
        use_url=False,
        required=False,
    )
    logo = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Restaurants
        fields = [
            "id",
            "name",
            "description",
            "logo",
            "user",
            "is_active",
            "open_time",
            "close_time",
            "latitude",
            "longitude",
            "create_at",
            "updated_at",
        ]

    def create(self, validated_data):
        user_get = self.context.get("user")
        groups = user_get.groups.all()
        if groups:
            if str(groups[0]) == "manager":
                create_foods = Restaurants.objects.create(**validated_data)
                create_foods.user = self.context.get("user")
                create_foods.save()
                return create_foods
            else:
                raise serializers.ValidationError(
                    {"error": "It is not possible to add information to such a user"}
                )
        else:
            raise serializers.ValidationError(
                {"error": "User does not belong to any role"}
            )

    def update(self, instance, validated_data):
        user_get = self.context.get("user")
        groups = user_get.groups.all()
        if groups:
            if str(groups[0]) == "manager":
                instance.name = validated_data.get("name", instance.name)
                instance.description = validated_data.get(
                    "description", instance.description)
                instance.is_active = validated_data.get(
                    "is_active", instance.is_active)
                instance.open_time = validated_data.get(
                    "open_time", instance.open_time
                )
                instance.close_time = validated_data.get(
                    "close_time", instance.close_time
                )
                instance.latitude = validated_data.get("latitude", instance.latitude)
                instance.longitude = validated_data.get(
                    "longitude", instance.longitude)
                if instance.logo == None:
                    instance.logo = self.context.get("logo")
                else:
                    instance.logo = validated_data.get("logo", instance.logo)

                return instance
            else:
                raise serializers.ValidationError(
                    {"error": "It is not possible to add information to such a user"}
                )
        else:
            raise serializers.ValidationError(
                {"error": "User does not belong to any role"}
            )


class AllFoodKitchenSerializers(serializers.ModelSerializer):
    food_img = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Foods
        fields = [
            'id',
            'name',
            'description',
            'food_img',
            'price',
            'kitchen', 'categories', 'create_at', 'updated_at']


class CategoriesFoodsCrudSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodsCategories
        fields = ['id', 'name', "create_at", "updated_at"]

    def create(self, validated_data):
        user_get = self.context.get("user_id")
        groups = user_get.groups.all()
        if groups:
            if str(groups[0]) == "admins":
                create_categories = FoodsCategories.objects.create(
                    **validated_data)
                return create_categories
            else:
                raise serializers.ValidationError(
                    {"error": "It is not possible to add information to such a user"}
                )
        else:
            raise serializers.ValidationError(
                {"error": "User does not belong to any role"}
            )

    def update(self, instance, validated_data):
        user_get = self.context.get("user_id")
        groups = user_get.groups.all()
        if groups:
            if str(groups[0]) == "admins":
                instance.name = validated_data.get("name", instance.name)
                instance.save()
                return instance
            else:
                raise serializers.ValidationError(
                    {"error": "It is not possible to add information to such a user"}
                )
        else:
            raise serializers.ValidationError(
                {"error": "User does not belong to any role"}
            )
