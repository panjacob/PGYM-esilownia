from django.db import models
from django.utils import timezone

from users.models import UserExtended


class Application(models.Model):
    owner = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, blank=True, default=None)
    date = models.DateTimeField(default=timezone.now)
    description = models.CharField(max_length=10000)
    trainer = models.BooleanField(default=False)
    dietician = models.BooleanField(default=False)
    PENDING = '0'
    ACCEPTED = '1'
    REJECTED = '2'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (REJECTED, 'Rejected'),
    ]

    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=PENDING)
    file = models.FileField(null=True, blank=True)


class ApplicationImage(models.Model):
    owner = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, blank=True, default=None)
    file = models.FileField(null=True, blank=True)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
