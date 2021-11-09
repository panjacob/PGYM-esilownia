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
