from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from authen.models import CustomUser, SmsHistory
from import_export.admin import ImportExportModelAdmin


class CustomUserAdmin(ImportExportModelAdmin, UserAdmin):
    model = CustomUser
    list_display = ['email', 'username', 'is_active', 'is_staff']
    search_fields = ['email', 'username']
    fieldsets = (
        (None, {'fields': ('first_name', 'last_name', 'email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                    'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Personal Information', {'fields': ('phone', "active_profile", 'user_id', 'avatar',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(SmsHistory)