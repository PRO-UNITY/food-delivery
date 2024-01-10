from rest_framework import serializers
from foods.models import (
    Foods,
    Favorite,
)


class FoodsSerializer(serializers.ModelSerializer):
    food_img = serializers.ImageField(max_length=None, use_url=True)
    favorite = serializers.SerializerMethodField()

    class Meta:
        model = Foods
        fields = ["id", "name", "food_img", "description", "price", "kitchen", "categories", "favorite", "create_at", "updated_at",]

    def get_favorite(self, obj):
        user = self.context.get("user")
        # print(user)
        user_favorities = Favorite.objects.filter(user=user)
        if user_favorities.filter(food__id=obj.id).exists():
            return True
        return False


class FoodSerializer(serializers.ModelSerializer):
    food_img = serializers.ImageField(max_length=None, use_url=True)
    food_img = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=False, use_url=False, required=False,)

    class Meta:
        model = Foods
        fields = ["id", "name", "food_img", "description", "price", "kitchen", "categories", "create_at", "updated_at",]

    def create(self, validated_data):
        create_foods = Foods.objects.create(**validated_data)
        create_foods.save()
        return create_foods

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.price = validated_data.get("price", instance.price)
        instance.kitchen = validated_data.get("kitchen", instance.kitchen)
        instance.categories = validated_data.get("categories", instance.categories)
        if instance.food_img == None:
            instance.food_img = self.context.get("food_img")
        else:
            instance.food_img = validated_data.get("food_img", instance.food_img)
        instance.save()
        return instance
