# Register your models here.
from django.contrib import admin

from dashboard.models import UserDay


@admin.register(UserDay)
class AdminUserDay(admin.ModelAdmin):
    model = UserDay
    list_display = ['id', 'date', 'sleep_start', 'calories_burned', 'calories_eaten', 'steps']

# admin.site.register(UserExtended, AdminUserExtended)
