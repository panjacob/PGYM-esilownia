from django.db import models
from users.models import UserExtended
from training.utilis import current_milli_time
from payment.utilis import random_string


class Transaction(models.Model):
    transaction_id = models.CharField(unique=True, default=random_string)
    user = models.ForeignKey(UserExtended, on_delete=models.CASCADE)
    time = models.IntegerField(default=current_milli_time)
    payed = models.DecimalField(decimal_places=2)
    purchased = models.IntegerField()


class Offer(models.Model):
    name = models.CharField()
    price = models.DecimalField(decimal_places=2)
    coins = models.IntegerField()
