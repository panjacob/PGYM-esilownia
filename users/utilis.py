# Returns true if password meets the requiremets
import functools

from rest_framework import status
from rest_framework.response import Response

from users.models import UserExtended


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
