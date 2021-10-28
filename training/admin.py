from django.contrib import admin
from training.models import TrainingGroup, TrainingGroupType, Training


@admin.register(TrainingGroup)
class TrainingGroupAdmin(admin.ModelAdmin):
    model = TrainingGroup
    list_display = ['id', 'owner', 'title', 'description', 'date', 'difficulty']


@admin.register(TrainingGroupType)
class TrainingGroupTypesAdmin(admin.ModelAdmin):
    model = TrainingGroupType
    list_display = ['id', 'type', 'description']


@admin.register(Training)
class TrainingGroupTypesAdmin(admin.ModelAdmin):
    model = Training
    list_display = ['id', 'training_group', 'title', 'description', 'date_start', 'date_end', 'calories']
