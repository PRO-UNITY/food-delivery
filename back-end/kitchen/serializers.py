from rest_framework import serializers
from authen.models import CustomUser, KitchenUser
from kitchen.models import KitchenFoods


class UserInformationSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email"
        ]


class AllKitchenSerializers(serializers.ModelSerializer):
    user_id = UserInformationSerializers(read_only=True)

    class Meta:
        model = KitchenUser
        fields = [
            "id", "name", "description", "logo", "user_id", "is_active", "date"
        ]


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
            "id", "name", "description", "logo", "user_id", "is_active", "date"
            ]

    def create(self, validated_data):
        create_foods = KitchenUser.objects.create(**validated_data)
        create_foods.user_id = self.context.get("user_id")
        create_foods.save()
        return create_foods

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get(
            "description", instance.description)
        instance.is_active = validated_data.get(
            "is_active", instance.is_active)
        if instance.logo == None:
            instance.logo = self.context.get("logo")
        else:
            instance.logo = validated_data.get("logo", instance.logo)
        instance.save()
        return instance


class AllFoodKitchenSerializers(serializers.ModelSerializer):
    kitchen_id = AllKitchenSerializers(read_only=True)

    class Meta:
        model = KitchenFoods
        fields = [
            "id",
            "name",
            "description",
            "image_food",
            "kitchen_id",
            "date"
        ]


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
            "date"
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
