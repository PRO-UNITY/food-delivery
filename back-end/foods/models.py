from django.db import models
from kitchen.models import Restaurants
from authen.models import CustomUser


class FoodsCategories(models.Model):
    name = models.CharField(max_length=250)
    img = models.ImageField(upload_to="category", null=True, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "food_category_table"


class Foods(models.Model):
    name = models.CharField(max_length=250)
    food_img = models.ImageField(upload_to="foods")
    description = models.TextField()
    price = models.IntegerField(null=True, blank=True)
    kitchen = models.ForeignKey(Restaurants, on_delete=models.CASCADE, related_name="food")
    categories = models.ForeignKey(FoodsCategories, on_delete=models.CASCADE, related_name="foods")
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "food_table"


class Favorite(models.Model):
    food = models.ForeignKey(Foods, on_delete=models.CASCADE, null=True, blank=True, related_name="favorite")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    is_favorite = models.BooleanField(default=False)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "favorite_table"
