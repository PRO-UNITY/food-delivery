from django.db import models
from authen.models import CustomUser, KitchenUser


class KitchenFoods(models.Model):
    name = models.CharField(max_length=250, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    image_food = models.ImageField(upload_to='foods', null=True, blank=True)
    user_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    kitchen_id = models.ForeignKey(
        KitchenUser, on_delete=models.CASCADE, null=True, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
