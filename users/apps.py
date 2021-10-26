from django.apps import AppConfig


class AppConfig(AppConfig):
    # default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    verbose_name = 'Users'

    def ready(self):
        init_esilownia_application()


def init_esilownia_application(
        client_id='dFdnC978WJPKdx9efSKTFdym2LIQWkd8HXGMTpzs',
        client_type='confidential',
        client_secret='jjKsavkJG913gLTzWm4bcYjLWCdUUDapm7tuXElBji9FQuWckkty2RkqU0Z0rTIqiZw1UlQiKjMUG9a92whxOLCOZriszlHiNfIAELTp6zde31T0IgLKiRzOAzm4HihV',
        skip_authorization=0,
        authorization_grant_type='password',
        name='esilownia'
):
    try:
        from oauth2_provider.models import Application
        user = create_admin_default()
        app, created = Application.objects.get_or_create(id=1)
        app.user = user
        app.client_id = client_id
        app.client_type = client_type
        app.client_secret = client_secret
        app.skip_authorization = skip_authorization
        app.authorization_grant_type = authorization_grant_type
        app.name = name
        app.save()

    except Exception as e:
        print('Application exist, its OK', e)


def create_admin_default():
    from users.models import UserExtended
    if not UserExtended.objects.filter(id=1).exists():
        return UserExtended.objects.create_superuser(id=1, username='admin', email='admin@admin.pl',
                                                     first_name='admin', password='admin')
    else:
        return UserExtended.objects.get(id=1)
