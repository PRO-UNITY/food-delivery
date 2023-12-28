""" Django Libraries """
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from authen.models import CustomUser
from authen.forms import ChangeUser, CreasteUser
from import_export.admin import ImportExportModelAdmin


class NewMyUser(ImportExportModelAdmin, UserAdmin):
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
            {
                "fields": (
                    "email_code",
                    "avatar",
                    "user_id",
                    "phone",
                    "latitude",
                    "longitude",
                    "active_profile",
                )
            },
        ),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            None,
            {
                "fields": (
                    "email_code",
                    "avatar",
                    "user_id",
                    "phone",
                    "phone",
                    "latitude",
                    "longitude",
                    "active_profile",
                )
            },
        ),
    )


admin.site.register(CustomUser, NewMyUser)
