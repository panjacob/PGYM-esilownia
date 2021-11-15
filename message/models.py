from django.db import models

# Create your models here.
from training.utilis import current_milli_time
from users.models import UserExtended


class Message(models.Model):
    sender = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, default=None, related_name='sender')
    receiver = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, default=None,
                                 related_name='receiver')

    time = models.IntegerField(default=current_milli_time)
    message = models.CharField(max_length=10000)


class Notification(models.Model):
    user = models.ForeignKey(UserExtended, on_delete=models.CASCADE)

    APPLICATION_ACCEPTED = '1'
    APPLICATION_REJECTED = '2'
    TYPE_CHOICES = [
        (APPLICATION_ACCEPTED, 'APPLICATION ACCEPTED'),
        (APPLICATION_REJECTED, 'APPLICATION REJECTED'),
    ]

    type = models.CharField(max_length=1, choices=TYPE_CHOICES, default=None)

    body = models.CharField(max_length=10000)
    time = models.IntegerField(default=current_milli_time)
    seen = models.BooleanField(default=False)
