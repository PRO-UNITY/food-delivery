from django.db import models
from authen.models import CustomUser


class Restaurants(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField()
    logo = models.ImageField(upload_to='logo_kitchen')
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='user'
    )
    is_active = models.BooleanField(default=False)
    deliveryman_user = models.ManyToManyField(
        CustomUser,
        null=True,
        blank=True,
        related_name="delivery"
    )
    open_time = models.TimeField(null=True, blank=True)
    close_time = models.TimeField(null=True, blank=True)
    latitude = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
