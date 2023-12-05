from rest_framework import serializers
from authen.models import CustomUser, KitchenUser
from kitchen.models import KitchenFoods
from foods.models import FoodsCategories, Foods


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
    class Meta:
        model = KitchenUser
        fields = [
            "id", "name", "description", "logo", "user_id", "is_active", "date"
        ]


class AllCategoriesFoodsSerializer(serializers.ModelSerializer):
    kitchen_id = AllKitchenSerializers(read_only=True)

    class Meta:
        model = FoodsCategories
        fileds = ['id', 'name', 'kitchen_id', 'date']


class CategoriesFoodsCrudSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodsCategories
        fileds = ['id', 'name', 'kitchen_id', 'date']

    def create(self, validated_data):
        create_categoires = FoodsCategories.objects.create(**validated_data)
        create_categoires.save()
        return create_categoires

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.kitchen_id = validated_data.get(
            "kitchen_id", instance.kitchen_id)
        instance.save()
        return instance


class AllFoodsSerializer(serializers.ModelSerializer):
    categories_id = AllCategoriesFoodsSerializer(read_only=True)

    class Meta:
        model = FoodsCategories
        fileds = [
            'id',
            'name',
            'food_img',
            'content'
            'price',
            'categories_id',
            'date'
            ]


class FoodsCrudSerializer(serializers.ModelSerializer):
    categories_id = AllCategoriesFoodsSerializer(read_only=True)

    class Meta:
        model = FoodsCategories
        fileds = [
            'id',
            'name',
            'food_img',
            'content'
            'price',
            'kitchen_id',
            'categories_id',
            'date'
            ]
