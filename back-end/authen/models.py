from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser, Group


class Role(Group):
    class Meta:
        # Change the table name to 'my_group'
        db_table = 'user_role_table'


class CustomUser(AbstractUser):
    """Custom Users Table"""
    email_code = models.IntegerField(default=0, null=True, blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+9989999999'. Up to 15 digits allowed.")
    phone = models.CharField(validators=[phone_regex], max_length=250, null=True, blank=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    user_id = models.IntegerField(null=True, blank=True)
    active_profile = models.BooleanField(default=False)
    latitude = models.CharField(max_length=250, null=True, blank=True)
    longitude = models.CharField(max_length=250, null=True, blank=True)

    class Meta:
        db_table = "user_table"
