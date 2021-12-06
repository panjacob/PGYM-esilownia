import functools
import threading
import time
from datetime import timedelta

import jwt
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status

from training.models import TrainingGroup, Training, TrainingGroupParticipant


def current_milli_time():
    return round(time.time() * 1000)


def jitsi_token_encode(secret, payload):
    return jwt.encode(payload, secret, algorithm="HS256")


def jitsi_token_decode(secret, token):
    return jwt.decode(token, secret, algorithms=["HS256"])


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


def training_group_owner_required():
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            request = args[0]
            id = request.data.get('id', None)
            training_group_id = request.data.get('training_group', None)
            if TrainingGroup.objects.filter(id=id).exists():
                training_group = TrainingGroup.objects.get(id=id)
            elif TrainingGroup.objects.filter(id=training_group_id).exists():
                training_group = TrainingGroup.objects.get(id=training_group_id)
            else:
                return Response({'error': 'training_group_owner_required(): training_group not found'},
                                status.HTTP_400_BAD_REQUEST)

            if training_group.owner_id == request.user.id:
                return func(request)
            else:
                return Response({'message': 'User is not owner of a training group'}, status.HTTP_400_BAD_REQUEST)

        return wrapper

    return decorator


def training_owner_required():
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            request = args[0]
            id = request.data.get('id', None)
            training_id = request.data.get('training', None)
            if Training.objects.filter(id=id).exists():
                training = Training.objects.get(id=id)
            elif Training.objects.filter(id=training_id).exists():
                training = Training.objects.get(id=training_id)
            else:
                return Response({'error': 'training_owner_required(): training_group not found'},
                                status.HTTP_400_BAD_REQUEST)

            if training.training_group.owner_id == request.user.id:
                return func(request)
            else:
                return Response({'message': 'User is not owner of a training group'}, status.HTTP_400_BAD_REQUEST)

        return wrapper

    return decorator


def remove_participant_from_training_group_when_subscription_end():
    training_group_participants = TrainingGroupParticipant.objects.all()
    for x in training_group_participants:
        if x.subscription_end < timezone.now().date():
            print(f"Removed {x.user} from {x.training_group.id} - end of subscription")
            x.delete()


def do_job_every_x_seconds(f, interval):
    def repeat():
        while True:
            f()
            time.sleep(interval)

    t = threading.Thread(target=repeat, args=(), kwargs={}, daemon=True)
    t.start()
    return True


def get_price_and_days_to_add(payment_type, training_group):
    if payment_type == '0':
        price = training_group.price_day
        days_to_add = 1
    elif payment_type == '1':
        price = training_group.price_week
        days_to_add = 7
    elif payment_type == '2':
        price = training_group.price_month
        days_to_add = 30
    else:
        return None, None

    return price, days_to_add


def participant_extend_subscription(participant, days):
    participant.subscription_end += timedelta(days)
    participant.save()
