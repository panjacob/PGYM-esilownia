from django.contrib import admin
from training.models import TrainingGroup, TrainingGroupType, Training, TrainingGroupParticipant, TrainingGroupImage


@admin.register(TrainingGroup)
class TrainingGroupAdmin(admin.ModelAdmin):
    model = TrainingGroup
    list_display = ['id', 'owner', 'title', 'description', 'date', 'difficulty', 'price_day', 'price_week',
                    'price_month']


@admin.register(TrainingGroupType)
class TrainingGroupTypesAdmin(admin.ModelAdmin):
    model = TrainingGroupType
    list_display = ['id', 'type', 'description']


@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    model = Training
    list_display = ['id', 'training_group', 'title', 'description', 'date_start', 'date_end', 'calories']


@admin.register(TrainingGroupParticipant)
class TrainingGroupParticipantsAdmin(admin.ModelAdmin):
    model = TrainingGroupParticipant
    list_display = ['id', 'user', 'training_group', 'subscription_end']


# TrainingGroupParticipant
@admin.register(TrainingGroupImage)
class TrainingGroupImageAdmin(admin.ModelAdmin):
    model = TrainingGroupImage
    list_display = ['id', 'owner', 'image', 'training_group']
# Image
