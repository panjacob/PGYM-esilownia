from django.contrib import admin

# Register your models here.
from users.models import UserExtended


class AdminUserExtended(admin.ModelAdmin):
    model = UserExtended
    list_display = ['id', 'username', 'first_name', 'profile_photo']


admin.site.register(UserExtended, AdminUserExtended)
