from django.db import models
from authen.models import KitchenUser


class FoodsCategories(models.Model):
    name = models.CharField(max_length=250)
    kitchen = models.ForeignKey(KitchenUser, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Foods(models.Model):
    name = models.CharField(max_length=250)
    food_img = models.ImageField(upload_to="foods")
    description = models.TextField()
    price = models.CharField(max_length=100)
    kitchen = models.ForeignKey(
        KitchenUser, on_delete=models.CASCADE)
    categories = models.ForeignKey(
        FoodsCategories, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
