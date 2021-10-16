from django.db import models
from django.utils import timezone

from users.models import UserExtended


class UserDay(models.Model):
    user = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, blank=True, default=None)
    date = models.DateField()
    calories_burned = models.IntegerField(default=0)
    calories_eaten = models.IntegerField(default=0)
    sleep_start = models.DateTimeField(default=timezone.now)
    sleep_end = models.DateTimeField(default=timezone.now)
    steps = models.IntegerField(default=0)

    # class Meta:
    #     unique_together = (("user", "date"),)
