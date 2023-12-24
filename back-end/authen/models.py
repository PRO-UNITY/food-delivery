from django.db import models
from django.contrib.auth.models import AbstractUser, Group


class Role(Group):
    class Meta:
        # Change the table name to 'my_group'
        db_table = 'user_role_table'


class CustomUser(AbstractUser):
    """Custom Users Table"""
    email_code = models.IntegerField(default=0, null=True, blank=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    user_id = models.IntegerField(null=True, blank=True)
    active_profile = models.BooleanField(default=False)

    class Meta:
        db_table = "user_table"
