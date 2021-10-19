from django.db import models
from django.utils import timezone

from core import settings
from users.models import UserExtended

init_data_TrainingGroupTypes = [
    (1, 'siłowy', 'opis'),
    (2, 'cardio', 'opis'),
    (3, 'funkcjonalny', 'opis'),
    (4, 'fitness', 'opis'),
    (5, 'aerobowy', 'opis'),
    (6, 'ABS', 'opis'),
    (7, 'wibracyjny', 'opis'),
    (8, 'interwałowy', 'opis'),
    (9, 'streching', 'opis'),
    (10, 'yoga', 'opis'),
    (20, 'inne', 'opis'),
]


class TrainingGroupTypes(models.Model):
    type = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=300)


class Files(models.Model):
    my_file = models.FileField(storage=settings.MEDIA_PHOTO_VIDEOS_PATH)
    user = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, blank=True, default=None)


class TrainingGroup(models.Model):
    owner = models.ForeignKey(UserExtended, on_delete=models.CASCADE, null=True, blank=True, default=None,
                              related_name='owner')
    participants = models.ManyToManyField(UserExtended)
    date = models.DateField(default=timezone.now)

    EASY = '0'
    MEDIUM = '1'
    HARD = '2'
    ARMAGEDON = '3'
    DIFFICULTY_CHOICES = [
        (EASY, 'Easy'),
        (MEDIUM, 'Medium'),
        (HARD, 'Hard'),
        (ARMAGEDON, 'Armagedon'),
    ]
    difficulty = models.CharField(max_length=1, choices=DIFFICULTY_CHOICES, default=MEDIUM)
    type = models.ManyToManyField(TrainingGroupTypes)
    title = models.CharField(max_length=300)
    description = models.CharField(max_length=10000)
