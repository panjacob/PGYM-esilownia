from django.apps import AppConfig


class TrainingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'training'

    def ready(self):
        init_TrainingGroupTypes()


def init_TrainingGroupTypes():
    try:
        from training.models import TrainingGroupTypes, init_data_TrainingGroupTypes
        for id, type, description in init_data_TrainingGroupTypes:
            group, created = TrainingGroupTypes.objects.get_or_create(id=id)
            group.type = type
            group.description = description
            group.save()

    except Exception as e:
        pass
