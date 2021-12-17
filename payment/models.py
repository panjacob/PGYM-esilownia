import datetime

from django.db import models
from django.utils import timezone

from users.models import UserExtended
from training.utilis import current_milli_time
from payment.utilis import random_string


class Transaction(models.Model):
    transaction_id = models.CharField(unique=True, default=random_string, max_length=50)
    stripe_pi_id = models.CharField(max_length=150)
    user = models.ForeignKey(UserExtended, on_delete=models.CASCADE)
    time = models.IntegerField(default=current_milli_time)
    payed = models.DecimalField(decimal_places=2, max_digits=10)
    purchased = models.IntegerField()


class TrainingTransaction(models.Model):
    transaction_id = models.CharField(unique=True, default=random_string, max_length=50)
    time = models.IntegerField(default=current_milli_time)
    user = models.ForeignKey(UserExtended, on_delete=models.CASCADE)
    owner = models.ForeignKey(UserExtended, on_delete=models.CASCADE, related_name='user2')
    amount = models.IntegerField()


class Offer(models.Model):
    stripe_price_id = models.CharField(unique=True, max_length=150)
    name = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    coins = models.IntegerField()


class Withdraw(models.Model):
    date = models.DateTimeField(default=timezone.now)
    amount = models.IntegerField()

