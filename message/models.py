from django.db import models
from django.utils import timezone

from users.models import UserExtended
# Create your models here.
class Message(models.Model):
    sender = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, default=None, related_name='sender')
    receiver = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, default=None, related_name='receiver')

    date = models.DateField(default=timezone.now)
    message = models.CharField(max_length=10000)

