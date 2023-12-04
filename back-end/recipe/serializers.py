""" Django Settings Serializers """
from rest_framework import serializers
from authen.models import CustomUser
from recipe.models import (
    FoodCategories,
    Foods,
    FoodFiles,
)


class UserInformationSerializers(serializers.ModelSerializer):
    """User Profiles Serializers"""

    class Meta:
        """User Model Fileds"""

        model = CustomUser
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "avatar",
        ]


# food Categories
class AllFoodCategoriesSerializers(serializers.ModelSerializer):
    class Meta:
        model = FoodCategories
        fields = ["id", "categor_name", "categor_img"]


class FoodCategoriesCrudSerializers(serializers.ModelSerializer):
    categor_img = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        allow_null=False,
        use_url=False,
        required=False,
    )

    class Meta:
        model = FoodCategories
        fields = ["id", "categor_name", "categor_img"]

    def create(self, validated_data):
        return FoodCategories.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.categor_name = validated_data.get(
            "categor_name", instance.categor_name
        )
        if instance.categor_img == None:
            instance.categor_img = self.context.get("categor_img")
        else:
            instance.categor_img = validated_data.get(
                "categor_img", instance.categor_img
            )
        instance.save()
        return instance


# Food Serializers
class FoodFilesAllSerializers(serializers.ModelSerializer):
    class Meta:
        model = FoodFiles
        fields = ['id', 'food_id', 'food_files']


class FoodFilesCrudSerializers(serializers.ModelSerializer):
    food_files = serializers.FileField(
        max_length=None,
        allow_empty_file=False,
        allow_null=False,
        use_url=False,
        required=False,
    )

    class Meta:
        model = FoodFiles
        fields = ['id', 'food_id', 'food_files']

    def update(self, instance, validated_data):
        if instance.food_files == None:
            instance.food_files = self.context.get("food_files")
        else:
            instance.food_files = validated_data.get(
                "food_files", instance.food_files
            )
        instance.save()
        return instance


class FoodAllSerializers(serializers.ModelSerializer):
    categories_id = AllFoodCategoriesSerializers(read_only=True)
    food_files = FoodFilesAllSerializers(many=True, read_only=True)
    user_id = UserInformationSerializers(read_only=True)

    class Meta:
        model = Foods
        fields = [
            "id",
            "name",
            "content",
            "ingredients",
            "recipe",
            "user_id",
            "categories_id",
            "like",
            "food_files",
            "create_date"
        ]


class FoodCrudSerializers(serializers.ModelSerializer):
    food_files = serializers.ListField(
        child=serializers.ImageField(
            max_length=1000000, allow_empty_file=False, use_url=False
        ),
        write_only=True,
    )

    class Meta:
        model = Foods
        fields = [
            "id",
            "name",
            "content",
            "ingredients",
            "recipe",
            "user_id",
            "categories_id",
            "like",
            "food_files",
            "create_date"
        ]

    def create(self, validated_data):
        food_files = validated_data.pop("food_files")
        product = Foods.objects.create(**validated_data)
        for item in food_files:
            images = FoodFiles.objects.create(food_id=product, food_files=item)
            images.save()
        return product

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.content = validated_data.get("content", instance.content)
        instance.ingredients = validated_data.get(
            "ingredients", instance.ingredients)
        instance.recipe = validated_data.get("recipe", instance.recipe)
        instance.categories_id = validated_data.get(
            "categories_id", instance.categories_id)
        instance.save()
        return instance
