from rest_framework import serializers
from foods.models import (
    FoodsCategories,
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
        user_favorities = Favorite.objects.filter(user=user)
        if user_favorities.filter(food__id=obj.id).exists():
            return True
        return False


class AllCategoriesFoodsSerializer(serializers.ModelSerializer):
    food_count = serializers.SerializerMethodField()
    foods = FoodsSerializer(many=True, read_only=True)

    class Meta:
        model = FoodsCategories
        fields = "__all__"

    def get_food_count(self, obj):
        return obj.foods.count()


class CategoriesSerializer(serializers.ModelSerializer):
    food_count = serializers.SerializerMethodField()

    class Meta:
        model = FoodsCategories
        fields = ['id', 'name', 'food_count']

    def get_food_count(self, obj):
        return obj.foods.count()


class FavoritesSerializer(serializers.ModelSerializer):
    food = FoodsSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = ["id", "food", "user", "is_favorite", "create_at", "updated_at"]


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["id", "food", "user", "is_favorite", "create_at", "updated_at"]

    def create(self, validated_data):
        us = self.context.get("user")
        favorites = Favorite.objects.create(**validated_data)
        favorites.user = us
        favorites.save()
        return favorites


class FavoritesFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["id", "food", "user", "is_favorite"]
