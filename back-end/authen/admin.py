""" Django Libraries """
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from authen.models import CustomUser, Gender
from authen.forms import ChangeUser, CreasteUser


class NewMyUser(UserAdmin):
    """New User"""

    add_form = CreasteUser
    form = ChangeUser
    model = CustomUser
    list_display = [
        "username",
        "first_name",
        "last_name",
        "id",
    ]
    fieldsets = UserAdmin.fieldsets + (
        (
            None,
            {"fields": ("email_code", "birth_date", "gender_id", "avatar", "phone",)},
        ),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            None,
            {"fields": ("email_code", "birth_date", "gender_id", "avatar", "phone",)},
        ),
    )


admin.site.register(CustomUser, NewMyUser)

admin.site.register(Gender)