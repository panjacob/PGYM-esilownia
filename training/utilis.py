import time

import jwt


def current_milli_time():
    return round(time.time() * 1000)


def jitsi_token_encode(private_key, payload):
    return jwt.encode(payload, private_key, algorithm="RS256")


def jitsi_token_decode(public_key, token):
    return jwt.decode(token, public_key, algorithms=["RS256"])


def jitsi_exp(time_to_live_minutes):
    return current_milli_time() + time_to_live_minutes * 1000 * 60


def jitsi_payload_create(user, training, time_to_live_minutes=10):
    payload = {
        'context': {
            'user': {
                'name': f"{user.first_name} {user.last_name}"
            }
        },
        'moderator': is_training_owner(user, training),
        'aud': 'pgym-jitsi',
        'iss': 'pgym',
        'sub': 'pgym-jitsi.xyz',
        'room': training.id,
        'exp': jitsi_exp(time_to_live_minutes)
    }
    return payload


def is_training_owner(user, training):
    return training.training_group.owner_id == user.id


def is_training_group_owner(user, training_group):
    pass

