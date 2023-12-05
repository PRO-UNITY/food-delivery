from rest_framework import serializers
from authen.models import CustomUser
from kitchen.models import KitchenFoods


class AllFoodKitchenSerializers(serializers.ModelSerializer):
    class Meta:
        model = KitchenFoods
        fields = ["id", "name", "description", "image_food", "user_id", "date"]


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
        fields = ["id", "name", "description", "image_food", "user_id", "date"]

    def create(self, validated_data):
        create_foods = KitchenFoods.objects.create(**validated_data)
        create_foods.user_id = self.context.get("user_id")
        create_foods.save()
        return create_foods

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        if instance.image_food == None:
            instance.image_food = self.context.get("image_food")
        else:
            instance.image_food = validated_data.get("image_food", instance.image_food)
        instance.save()
        return instance
