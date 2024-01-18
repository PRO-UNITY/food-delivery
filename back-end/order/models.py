from django.db import models
from authen.models import CustomUser
from kitchen.models import Restaurants
from foods.models import Foods


class OrderStatus(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "order_status"


class Orders(models.Model):
    klient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='klient_id', null=True, blank=True)
    food = models.ManyToManyField(Foods, null=True, blank=True, related_name='food')
    kitchen = models.ForeignKey(Restaurants, on_delete=models.CASCADE, null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    is_delivery = models.BooleanField(default=False)
    is_order = models.BooleanField(default=False)
    delivery = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='delivery_id', null=True, blank=True)
    status = models.ForeignKey(OrderStatus, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=250, null=True, blank=True)
    location = models.JSONField(null=True, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "order_table"


