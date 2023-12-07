from rest_framework import serializers
from authen.models import CustomUser, KitchenUser, KitchenLike
from foods.models import FoodsCategories, Foods


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


class AllKitchenSerializers(serializers.ModelSerializer):
    class Meta:
        model = KitchenUser
        fields = ["id", "name", "description", "logo", "working_time"]


class AllKitchenKetegories(serializers.ModelSerializer):
    class Meta:
        model = FoodsCategories
        fields = ["id", "name", "kitchen_id"]


class AllFoodsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Foods
        fields = [
            "name",
            "food_img",
            "content",
            "price",
            "kitchen_id",
            "categories_id"
        ]
