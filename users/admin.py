from django.contrib import admin

# Register your models here.
from users.models import UserExtended


class AdminUserExtended(admin.ModelAdmin):
    model = UserExtended
    list_display = ['id', 'user_name', 'first_name']


admin.site.register(UserExtended, AdminUserExtended)
