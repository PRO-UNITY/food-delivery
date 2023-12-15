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
            "id", "name", "description", "logo", "user_id", "is_active", "create_at", "updated_at"
        ]


class AllCategoriesFoodsSerializer(serializers.ModelSerializer):
    kitchen = AllKitchenSerializers(read_only=True)

    class Meta:
        model = FoodsCategories
        fields = ['id', 'name', 'kitchen', "create_at", "updated_at"]


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
            "kitchen", instance.kitchen_id)
        instance.save()
        return instance


class AllFoodsSerializer(serializers.ModelSerializer):
    categories_id = AllCategoriesFoodsSerializer(read_only=True)

    class Meta:
        model = Foods
        fields = [
            'id',
            'name',
            'food_img',
            'description',
            'price',
            'categories_id',
            "create_at",
            "updated_at"
            ]


class FoodsCrudSerializer(serializers.ModelSerializer):
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
            'id',
            'name',
            'food_img',
            'description',
            'price',
            'kitchen_id',
            'categories_id',
            "create_at",
            "updated_at"
            ]

    def create(self, validated_data):
        create_foods = Foods.objects.create(**validated_data)
        create_foods.save()
        return create_foods

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.price = validated_data.get("price", instance.price)
        instance.kitchen_id = validated_data.get(
            "kitchen_id", instance.kitchen_id)
        instance.categories_id = validated_data.get(
            "categories_id", instance.categories_id)
        if instance.food_img == None:
            instance.food_img = self.context.get("food_img")
        else:
            instance.food_img = validated_data.get("food_img", instance.food_img)
        instance.save()
        return instance
