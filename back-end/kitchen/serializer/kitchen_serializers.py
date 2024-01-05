from rest_framework import serializers
from kitchen.models import Restaurants
from authen.serializers.authen_serializers import UserInformationSerializer
from foods.models import Foods
from kitchen.serializer.category_serializers import CategoriesFoodSerializer


class FoodsSerializer(serializers.ModelSerializer):
    categories = CategoriesFoodSerializer(read_only=True)

    class Meta:
        model = Foods
        fields = ["id", "categories"]


class KitchensSerializer(serializers.ModelSerializer):
    employes = UserInformationSerializer(many=True, read_only=True)
    logo = serializers.ImageField(max_length=None, use_url=True)
    foods = FoodsSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurants
        fields = ["id", "name", "description", "logo", "user", "is_active", "employes", "open_time", "close_time", "latitude", "longitude", "foods", "create_at", "updated_at",]


class KitchenSerializers(serializers.ModelSerializer):
    logo = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=False, use_url=False, required=False)
    logo = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Restaurants
        fields = ["id", "name", "description", "logo", "employes", "user", "is_active", "open_time", "close_time", "latitude", "longitude", "create_at", "updated_at",]

    def create(self, validated_data):
        create_foods = Restaurants.objects.create(**validated_data)
        create_foods.user = self.context.get("user")
        create_foods.save()
        return create_foods

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.open_time = validated_data.get("open_time", instance.open_time)
        instance.close_time = validated_data.get("close_time", instance.close_time)
        instance.latitude = validated_data.get("latitude", instance.latitude)
        instance.longitude = validated_data.get("longitude", instance.longitude)
        if instance.logo == None:
            instance.logo = self.context.get("logo")
        else:
            instance.logo = validated_data.get("logo", instance.logo)
        deliveries_data = validated_data.pop('employes')
        instance.employes.clear()
        for delivery_data in deliveries_data:
            instance.employes.add(delivery_data)
        instance.save()
        return instance
