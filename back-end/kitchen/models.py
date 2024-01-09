from django.db import models
from authen.models import CustomUser
from django.contrib.postgres.fields import ArrayField


class Restaurants(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField()
    logo = models.ImageField(upload_to='logo_kitchen')
    user = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    open_time = models.TimeField(null=True, blank=True)
    close_time = models.TimeField(null=True, blank=True)
    latitude = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class EmployeRestaurants(models.Model):
    restaurant = models.ForeignKey(Restaurants, on_delete=models.CASCADE)
    employe = models.IntegerField()
