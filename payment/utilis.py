from django.utils.crypto import get_random_string

code = get_random_string(5)


def random_string():
    return get_random_string(16)
