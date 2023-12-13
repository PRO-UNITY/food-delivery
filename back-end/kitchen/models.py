from django.db import models
from authen.models import CustomUser, KitchenUser


class KitchenFoods(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField()
    image_food = models.ImageField(upload_to='foods')
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE)
    kitchen = models.ForeignKey(
        KitchenUser, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
