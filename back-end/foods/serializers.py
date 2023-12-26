from rest_framework import serializers
from foods.models import (
    FoodsCategories,
    Foods,
    Favorite,
)


class FoodsSerializer(serializers.ModelSerializer):
    food_img = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Foods
        fields = [
            "id",
            "name",
            "food_img",
            "description",
            "price",
            "kitchen",
            "categories",
            "create_at",
            "updated_at",
        ]


class AllCategoriesFoodsSerializer(serializers.ModelSerializer):

    food_count = serializers.SerializerMethodField()
    foods  = FoodsSerializer(many=True, read_only=True)

    class Meta:
        model = FoodsCategories
        fields = '__all__'

    def get_food_count(self, obj):
        return obj.foods.count()


class CategoriesSerializer(serializers.ModelSerializer):

    food_count = serializers.SerializerMethodField()

    class Meta:
        model = FoodsCategories
        fields = '__all__'

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


class FoodsSerializer(serializers.ModelSerializer):
    # categories = CategoriesFoodsSerializer(read_only=True)
    food_img = serializers.ImageField(max_length=None, use_url=True)
    favorite = serializers.SerializerMethodField()

    class Meta:
        model = Foods
        fields = [
            "id",
            "name",
            "food_img",
            "description",
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


class FoodSerializer(serializers.ModelSerializer):

    food_img = serializers.ImageField(max_length=None, use_url=True)
    food_img = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        allow_null=False,
        use_url=False,
        required=False,
    )

    class Meta:
        model = Foods
        fields = [
            "id",
            "name",
            "food_img",
            "description",
            "price",
            "kitchen",
            "categories",
            "create_at",
            "updated_at",
        ]

    def create(self, validated_data):
        user_get = self.context.get("user")
        print(user_get)
        groups = user_get.groups.all()
        if groups:
            if str(groups[0]) == "kitchen":
                create_foods = Foods.objects.create(**validated_data)
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
                instance.price = validated_data.get("price", instance.price)
                instance.kitchen = validated_data.get("kitchen", instance.kitchen)
                instance.categories = validated_data.get(
                    "categories", instance.categories
                )
                if instance.food_img == None:
                    instance.food_img = self.context.get("food_img")
                else:
                    instance.food_img = validated_data.get(
                        "food_img", instance.food_img
                    )
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
