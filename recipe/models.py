from django.db import models
from authen.models import CustomUser


class FoodCategories(models.Model):
    categor_name = models.CharField(max_length=100, null=True, blank=True)
    categor_img = models.ImageField(
        upload_to='categor_img', null=True, blank=True)

    def __str__(self):
        return self.categor_name


class Foods(models.Model):
    name = models.CharField(max_length=250, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    ingredients = models.JSONField(null=True, blank=True)
    recipe = models.JSONField(null=True, blank=True)
    user_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    categories_id = models.ForeignKey(
        FoodCategories, on_delete=models.CASCADE, null=True, blank=True)
    like = models.IntegerField(default=0, null=True, blank=True)
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class FoodLike(models.Model):
    food_id = models.ForeignKey(
        Foods,
        on_delete=models.CASCADE, null=True, blank=True, related_name='foods')
    line = models.IntegerField(default=0, null=True, blank=True)


class FoodFiles(models.Model):
    food_id = models.ForeignKey(
        Foods, on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="food_files"
    )
    food_files = models.FileField(
        upload_to='food_files/',
        null=True,
        blank=True
    )
