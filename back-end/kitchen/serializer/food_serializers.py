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
        fields = ["id", "name", "description", "food_img", "price", "kitchen", "categories", "favorite", "create_at", "updated_at"]

    def get_favorite(self, obj):
        user = self.context.get('user')
        user_favorities = Favorite.objects.filter(user=user)
        if user_favorities.filter(food__id=obj.id).exists():
            return True
        return False