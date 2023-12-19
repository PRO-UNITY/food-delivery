from rest_framework import serializers
from authen.models import CustomUser, KitchenUser, KitchenLike
from kitchen.models import KitchenFoods
from foods.models import FoodsCategories, Foods


class UserInformationSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "first_name", "last_name", "email"]


class KitchenLikeSerializers(serializers.ModelSerializer):
    class Meta:
        model = KitchenLike
        fields = [
            "id",
            "like",
            "id_kitchen",
            "user_id",
            "is_active",
            "create_at",
            "updated_at"
        ]


class AllKitchenSerializers(serializers.ModelSerializer):
    deliveryman_user = UserInformationSerializers(many=True, read_only=True)

    class Meta:
        model = KitchenUser
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


class KitchenUserWithCounterSerializer(serializers.ModelSerializer):
    foods_count = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = KitchenUser
        fields = '__all__'

    def get_foods_count(self, obj):
        return obj.foods_set.count()

    def get_like_count(self, obj):
        return obj.kitchenlike_set.count()


class KitchenCrudSerializers(serializers.ModelSerializer):
    logo = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        allow_null=False,
        use_url=False,
        required=False,
    )

    class Meta:
        model = KitchenUser
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
        create_foods = KitchenUser.objects.create(**validated_data)
        create_foods.user = self.context.get("user")
        create_foods.save()
        return create_foods

    def update(self, instance, validated_data):
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


class AllFoodKitchenSerializers(serializers.ModelSerializer):

    class Meta:
        model = Foods
        fields = [
            'id',
            'name',
            'description',
            'food_img',
            'price',
            'kitchen', 'categories', 'create_at', 'updated_at']


class DeliveryChickenSerializers(serializers.ModelSerializer):
    delivery = UserInformationSerializers(many=True, read_only=True)

    class Meta:
        model = KitchenUser
        fields = [
            "id",
            "delivery",
        ]

    def update(self, instance, validated_data):
        deliveries_data = validated_data.pop("delivery")
        instance.delivery.clear()
        for delivery_data in deliveries_data:
            instance.delivery.add(delivery_data)
        instance.save()
        return instance


class FoodKitchenCrudSerializers(serializers.ModelSerializer):
    image_food = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        allow_null=False,
        use_url=False,
        required=False,
    )

    class Meta:
        model = KitchenFoods
        fields = [
            "id",
            "name",
            "description",
            "image_food",
            "user_id",
            "kitchen_id",
            "create_at",
            "updated_at",
        ]

    def create(self, validated_data):
        create_foods = KitchenFoods.objects.create(**validated_data)
        create_foods.user_id = self.context.get("user_id")
        create_foods.save()
        return create_foods

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get(
            "description", instance.description)
        instance.kitchen_id = validated_data.get(
            "kitchen_id", instance.kitchen_id)
        if instance.image_food == None:
            instance.image_food = self.context.get("image_food")
        else:
            instance.image_food = validated_data.get(
                "image_food", instance.image_food)
        instance.save()
        return instance


class CategoriesFoodsCrudSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodsCategories
        fields = ['id', 'name', 'kitchen', "create_at", "updated_at"]

    def create(self, validated_data):
        create_categoires = FoodsCategories.objects.create(**validated_data)
        create_categoires.save()
        return create_categoires

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.kitchen = validated_data.get(
            "kitchen", instance.kitchen)
        instance.save()
        return instance
