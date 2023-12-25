from django.db import models
from authen.models import CustomUser
from kitchen.models import Restaurants


class OrderStatus(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "order_status"


class Orders(models.Model):
    klient = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='klient_id',
        null=True,
        blank=True
        )
    delivery = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='delivery_id',
        null=True,
        blank=True
    )
    kitchen = models.ForeignKey(
        Restaurants,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='kitchen'
    )
    status = models.ForeignKey(OrderStatus, on_delete=models.CASCADE)
    foods = models.JSONField(null=True, blank=True)
    total_price = models.IntegerField(null=True, blank=True)
    is_delivery = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    address = models.CharField(max_length=250)
    latitude = models.CharField(max_length=250, null=True)
    longitude = models.CharField(max_length=250, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "order_table"
