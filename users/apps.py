from django.apps import AppConfig

from core.settings import SOCIAL_AUTH_FACEBOOK_KEY, SOCIAL_AUTH_FACEBOOK_SECRET, SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET, \
    SOCIAL_AUTH_GOOGLE_OAUTH2_KEY


class AppConfig(AppConfig):
    # default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    verbose_name = 'Users'

    def ready(self):
        try:
            # esilownia
            init_application()
            # facebook
            init_application(id=2, name='facebook', client_id=SOCIAL_AUTH_FACEBOOK_KEY,
                             client_secret=SOCIAL_AUTH_FACEBOOK_SECRET)
            # google
            init_application(id=3, name='google', client_id=SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
                             client_secret=SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET)
            create_admin_default()
        except Exception as e:
            print(e)
            print('Application and admin not added automatically \n Probably its first migration')


def init_application(
        client_id='dFdnC978WJPKdx9efSKTFdym2LIQWkd8HXGMTpzs',
        client_type='confidential',
        client_secret='jjKsavkJG913gLTzWm4bcYjLWCdUUDapm7tuXElBji9FQuWckkty2RkqU0Z0rTIqiZw1UlQiKjMUG9a92whxOLCOZriszlHiNfIAELTp6zde31T0IgLKiRzOAzm4HihV',
        skip_authorization=0,
        authorization_grant_type='password',
        name='esilownia',
        id=1
):
    try:
        from oauth2_provider.models import Application
        user = create_admin_default()
        app, created = Application.objects.get_or_create(id=id)
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
    try:
        from users.models import UserExtended
        if not UserExtended.objects.filter(id=1).exists():
            return UserExtended.objects.create_superuser(id=1, username='admin@admin.pl', email='admin@admin.pl',
                                                         first_name='admin', password='admin')
        else:
            return UserExtended.objects.get(id=1)
    except:
        print("There is no user table!")
