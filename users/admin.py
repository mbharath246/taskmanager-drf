from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import CustomUser


class CutomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['email','is_staff','is_active','is_superuser']
    list_filter = ['is_staff','is_active','is_superuser']
    search_fields = ('email',)
    ordering = ('-date_joined',)

    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["date_joined"]}),
        ("Permissions", {"fields": ["is_staff","is_active","is_superuser"]}),
    ]

    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "date_joined", "password1", "password2"],
            },
        ),
    ]

admin.site.register(CustomUser, CutomUserAdmin)