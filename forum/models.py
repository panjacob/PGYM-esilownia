from django.db import models

# Create your models here.
from django.utils import timezone

from users.models import UserExtended


class Post(models.Model):
    owner = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, default=None)
    date = models.DateTimeField(default=timezone.now)
    body = models.CharField(max_length=100000)


class Topic(models.Model):
    owner = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, default=None)
    date = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=1000)
    body = models.CharField(max_length=100000)
    posts = models.ManyToManyField(Post)
