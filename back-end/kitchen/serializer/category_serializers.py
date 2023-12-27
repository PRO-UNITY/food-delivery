from rest_framework import serializers
from foods.models import FoodsCategories, Foods, Favorite


class CategoriesFoodSerializer(serializers.ModelSerializer):
    food_count = serializers.SerializerMethodField()

    class Meta:
        model = FoodsCategories
        fields = ["id", "name", "food_count"]

    def get_food_count(self, obj):
        return obj.foods.count()


class KitchenFoodsSerializers(serializers.ModelSerializer):
    food_img = serializers.ImageField(max_length=None, use_url=True)
    categories = CategoriesFoodSerializer(read_only=True)
    favorite = serializers.SerializerMethodField()

    class Meta:
        model = Foods
        fields = ["id", "name", "description", "food_img", "price", "kitchen", "categories", "favorite", "create_at", "updated_at",]

    def get_favorite(self, obj):
        user = self.context.get('user')
        user_favorities = Favorite.objects.filter(user=user)
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
                raise serializers.ValidationError({"error": "It is not possible to add information to such a user"})
        else:
            raise serializers.ValidationError({"error": "User does not belong to any role"})

    def update(self, instance, validated_data):
        user_get = self.context.get("user_id")
        groups = user_get.groups.all()
        if groups:
            if str(groups[0]) == "admins":
                instance.name = validated_data.get("name", instance.name)
                instance.save()
                return instance
            else:
                raise serializers.ValidationError({"error": "It is not possible to add information to such a user"})
        else:
            raise serializers.ValidationError({"error": "User does not belong to any role"})
