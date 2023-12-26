from rest_framework import serializers
from kitchen.models import Restaurants
from authen.serializers.authen_serializers import UserInformationSerializer
from foods.models import FoodsCategories, Foods, Favorite


class CategoriesFoodSerializer(serializers.ModelSerializer):
    food_count = serializers.SerializerMethodField()

    class Meta:
        model = FoodsCategories
        fields = ["id", "name", "food_count"]

    def get_food_count(self, obj):
        return obj.foods.count()


class FoodsSerializer(serializers.ModelSerializer):
    categories = CategoriesFoodSerializer(read_only=True)

    class Meta:
        model = Foods
        fields = ["id", "categories"]


class KitchensSerializer(serializers.ModelSerializer):
    deliveryman_user = UserInformationSerializer(many=True, read_only=True)
    logo = serializers.ImageField(max_length=None, use_url=True)
    foods = FoodsSerializer(many=True, read_only=True)

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
            "foods",
            "create_at",
            "updated_at",
        ]


class KitchenSerializers(serializers.ModelSerializer):
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
            if str(groups[0]) == "kitchen":
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
            if str(groups[0]) == "kitchen":
                instance.name = validated_data.get("name", instance.name)
                instance.description = validated_data.get(
                    "description", instance.description
                )
                instance.is_active = validated_data.get("is_active", instance.is_active)
                instance.open_time = validated_data.get("open_time", instance.open_time)
                instance.close_time = validated_data.get(
                    "close_time", instance.close_time
                )
                instance.latitude = validated_data.get("latitude", instance.latitude)
                instance.longitude = validated_data.get("longitude", instance.longitude)
                if instance.logo == None:
                    instance.logo = self.context.get("logo")
                else:
                    instance.logo = validated_data.get("logo", instance.logo)
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


class KitchenFoodsSerializers(serializers.ModelSerializer):
    food_img = serializers.ImageField(max_length=None, use_url=True)
    categories = CategoriesFoodSerializer(read_only=True)
    favorite = serializers.SerializerMethodField()

    class Meta:
        model = Foods
        fields = [
            "id",
            "name",
            "description",
            "food_img",
            "price",
            "kitchen",
            "categories",
            "favorite",
            "create_at",
            "updated_at",
        ]

    def get_favorite(self, obj):
        user = self.context.get('user')
        user_favorities = Favorite.objects.filter(
            user=user
        )
        if user_favorities.filter(food__id=obj.id).exists():
            return True
        return False


class CategoriesKitFoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodsCategories
        fields = ["id", "name"]


class KitchenKategorySerializer(serializers.ModelSerializer):
    categories = CategoriesKitFoodsSerializer(read_only=True)

    class Meta:
        model = Foods
        fields = ["categories"]


class FoodCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodsCategories
        fields = ["id", "name", "create_at", "updated_at"]

    def create(self, validated_data):
        user_get = self.context.get("user_id")
        groups = user_get.groups.all()
        if groups:
            if str(groups[0]) == "admins":
                create_categories = FoodsCategories.objects.create(**validated_data)
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
