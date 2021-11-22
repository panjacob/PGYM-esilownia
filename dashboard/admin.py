# Register your models here.
from django.contrib import admin

from dashboard.models import UserDay, Achievement, AchievementtUser


# [field.name for field in Achievement._meta.get_fields()]

@admin.register(UserDay)
class AdminUserDay(admin.ModelAdmin):
    model = UserDay
    list_display = ['id', 'date', 'sleep_start', 'calories_burned', 'calories_eaten', 'steps']


@admin.register(Achievement)
class AdminAchievment(admin.ModelAdmin):
    model = Achievement
    list_display = ['id', 'title', 'description', 'image']


@admin.register(AchievementtUser)
class AdminAchievmentUser(admin.ModelAdmin):
    model = AchievementtUser
    list_display = ['id', 'owner', 'achievment']
