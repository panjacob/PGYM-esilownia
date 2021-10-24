# Returns true if password meets the requiremets
from users.models import UserExtended


def validate_password(password):
    return True


def is_email_in_db(pk, email):
    return UserExtended.objects.exclude(pk=pk).filter(email=email).exists()


def is_username_in_db(pk, username):
    return UserExtended.objects.exclude(pk=pk).filter(username=username).exists()


def put_owner_to_request_data(request):
    request.data._mutable = True
    request.data['owner'] = request.user.id
    request.data._mutable = False
    return request
