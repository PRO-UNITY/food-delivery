from django.db import models
from kitchen.models import Restaurants


class FoodsCategories(models.Model):
    name = models.CharField(max_length=250)
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
    kitchen = models.ForeignKey(
        Restaurants, on_delete=models.CASCADE, related_name="foods")
    categories = models.ForeignKey(
        FoodsCategories, on_delete=models.CASCADE, related_name='foods')
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "food_table"
