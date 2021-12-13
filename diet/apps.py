from django.apps import AppConfig


class DietConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'diet'

    def ready(self):
        import os
        if os.environ.get('RUN_MAIN', None) != 'true':
            init_DietGroupTypes()

            # from training.utilis import remove_participant_from_training_group_when_subscription_end, \
            #     do_job_every_x_seconds
            # do_job_every_x_seconds(remove_participant_from_training_group_when_subscription_end, 1 * 60 * 60)


def init_DietGroupTypes():
    try:
        from diet.models import DietGroupType, DietGroupTypes
        for id, type in DietGroupTypes:
            instance, created = DietGroupType.objects.get_or_create(id=id)
            instance.type = type
            instance.save()

    except Exception as e:
        pass
