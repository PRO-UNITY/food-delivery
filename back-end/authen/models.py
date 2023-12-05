from django.db import models
from django.contrib.auth.models import AbstractUser


class Gender(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    """Custom Users Table"""
    email_code = models.IntegerField(default=0, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    phone = models.CharField(
        max_length=250,
        null=True, blank=True)
    gender_id = models.ForeignKey(
        Gender,
        on_delete=models.CASCADE, null=True, blank=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)


class KitchenUser(models.Model):
    name = models.CharField(max_length=250, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    logo = models.ImageField(upload_to='logo_kitchen', null=True, blank=True)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    is_active = models.BooleanField(default=False)
    working_time = models.CharField(max_length=100, null=True, blank=True)
    latitude = models.CharField(max_length=100, null=True, blank=True)
    longitude = models.CharField(max_length=100, null=True, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
