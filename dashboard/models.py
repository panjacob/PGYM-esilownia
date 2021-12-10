from django.db import models
from django.utils import timezone

from users.models import UserExtended


class UserDay(models.Model):
    user = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, blank=True, default=None)
    date = models.DateField()
    weight = models.FloatField(default=0, blank=True)
    calories_burned = models.IntegerField(default=0)
    calories_eaten = models.IntegerField(default=0)
    sleep_start = models.DateTimeField(default=None, null=True, blank=True)
    sleep_end = models.DateTimeField(default=None, null=True, blank=True)
    steps = models.IntegerField(default=0)


class Achievement(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=150)
    image = models.ImageField(null=True, blank=True)


class AchievementtUser(models.Model):
    owner = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, blank=True, default=None)
    achievment = models.ForeignKey(Achievement, on_delete=models.CASCADE, null=True, blank=True, default=None)
