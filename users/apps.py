from django.apps import AppConfig


class AppConfig(AppConfig):
    # default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    verbose_name = 'Users'

    def ready(self):
        init_esilownia_application()


def init_esilownia_application():
    try:
        from
        pass

    except Exception as e:
        pass
