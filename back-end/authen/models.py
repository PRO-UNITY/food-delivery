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
