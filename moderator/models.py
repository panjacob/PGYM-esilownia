from django.db import models
from django.utils import timezone

from users.models import UserExtended


class Application(models.Model):
    owner = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, blank=True, default=None)
    date = models.DateTimeField(default=timezone.now)
    description = models.CharField(max_length=10000)
    active = models.BooleanField(default=False)


class ApplicationImage(models.Model):
    owner = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, blank=True, default=None)
    file = models.FileField(null=True, blank=True)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
