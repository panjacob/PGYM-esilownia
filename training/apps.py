from django.apps import AppConfig


class TrainingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'training'

    def ready(self):
        import os
        if os.environ.get('RUN_MAIN', None) != 'true':
            init_TrainingGroupTypes()
            from training.utilis import remove_participant_from_training_group_when_subscription_end, \
                do_job_every_x_seconds
            do_job_every_x_seconds(remove_participant_from_training_group_when_subscription_end, 1 * 60 * 60)


def init_TrainingGroupTypes():
    try:
        from training.models import TrainingGroupType, init_data_TrainingGroupTypes
        for id, type, description in init_data_TrainingGroupTypes:
            group, created = TrainingGroupType.objects.get_or_create(id=id)
            group.type = type
            group.description = description
            group.save()

    except Exception as e:
        pass
