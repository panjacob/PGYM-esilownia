from django.db import models

from django.db import models
from django.utils import timezone

from users.models import UserExtended

DietGroupTypes = [
    (1, 'podstawowa'),
    (2, 'łatwo strawna'),
    (3, 'wysokobiałkowa'),
    (4, 'niskobiałkowa'),
    (5, 'bezglutenowa'),
    (6, 'cukrzycowa'),
    (7, 'ubogoenergetyczna'),
    (8, 'o ograniczeniem tłuszczu'),
    (9, 'dieta wrzodowa'),
    (10, 'bogato resztkowa'),
    (20, 'inna'),
]


class DietGroupType(models.Model):
    type = models.CharField(max_length=50, unique=True)


class DietGroup(models.Model):
    owner = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, default=None,
                              related_name='owner_diet')
    date = models.DateField(default=timezone.now)
    is_private = models.BooleanField(default=False)
    type = models.ManyToManyField(DietGroupType)
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=10000)
    price_day = models.IntegerField(default=None, null=True)
    price_week = models.IntegerField(default=None, null=True)
    price_month = models.IntegerField(default=None, null=True)

    image = models.ImageField(null=True, blank=True)


class DietGroupParticipant(models.Model):
    user = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, blank=True, default=None)
    diet_group = models.ForeignKey(DietGroup, on_delete=models.CASCADE, null=True, blank=True, default=None)
    subscription_end = models.DateField(default=timezone.now)


class DietGroupFile(models.Model):
    owner = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, blank=True, default=None)
    file = models.FileField(null=True, blank=True)
    diet_group = models.ForeignKey(DietGroup, on_delete=models.CASCADE)
