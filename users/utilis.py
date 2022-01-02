import functools
import threading
from django.utils.crypto import get_random_string
from django.core.mail import send_mail

from rest_framework import status
from rest_framework.response import Response

from users.models import UserExtended


class EmailThread(threading.Thread):
    def __init__(self, subject, html_message, recipent):
        self.subject = subject
        self.html_message = html_message
        self.recipent = recipent
        threading.Thread.__init__(self)
    def run(self):
        send_mail(self.subject, '', 'yot2137@cock.li', [self.recipent], html_message=self.html_message, fail_silently=False)


def send_html_mail(subject, html_message, recipent):
    print('Email sending disabled') # TODO enable before deployment
    return
    EmailThread(subject, html_message, recipent).start()


def generate_password_reset_email_body(host, token):
    if "localhost" in host or "127.0.0.1" in host:
        link = f'http://localhost:3000/password_reset?token={token}'
    else:
        link = f'https://pgym.xyz/password_reset?token={token}'
    html_message = f'Aby zresetować swoje hasło kliknij <a href="{link}">TUTAJ</a>'
    return html_message


def validate_password(password):
    return True


def is_email_in_db(pk, email):
    return UserExtended.objects.exclude(pk=pk).filter(email=email).exists()


def is_username_in_db(pk, username):
    return UserExtended.objects.exclude(pk=pk).filter(username=username).exists()


def put_owner_in_request_data(request):
    request.data._mutable = True
    request.data['owner'] = request.user.id
    request.data._mutable = False
    return request


def put_sender_in_request_data(request):
    request.data._mutable = True
    request.data['sender'] = request.user.id
    request.data._mutable = False
    return request


def moderator_required():
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            request = args[0]
            if request.user.is_moderator or request.user.is_superuser:
                return func(request)
            else:
                return Response({'message': 'Moderator is required'}, status.HTTP_400_BAD_REQUEST)

        return wrapper

    return decorator


def coach_required():
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            request = args[0]
            if request.user.is_coach or request.user.is_moderator or request.user.is_superuser:
                return func(request)
            else:
                return Response({'message': 'Coach is required'}, status.HTTP_400_BAD_REQUEST)

        return wrapper

    return decorator


def dietician_required():
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            request = args[0]
            if not request.user.is_dietician:
                return Response({'message': 'Dietician is required'}, status.HTTP_400_BAD_REQUEST)
            else:
                return func(request)

        return wrapper

    return decorator


def superuser_required():
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            request = args[0]
            if request.user.is_superuser:
                return func(request)
            else:
                return Response({'message': 'Moderator is required'}, status.HTTP_400_BAD_REQUEST)

        return wrapper

    return decorator


def generate_password_reset_token():
    return get_random_string(150)