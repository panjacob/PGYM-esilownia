from django.db.models import Q

from message.models import Message, Notification
import json


def get_messages_all(user1, user2):
    messages = Message.objects.filter((Q(sender=user1, receiver=user2) | Q(sender=user2, receiver=user1)))
    messages = messages.order_by('time')
    return messages


def notification_send(user, body, kind):
    body_json = json.dumps(body)
    notification = Notification.objects.create(user=user, body=body_json, kind=kind)
    notification.save()
    return notification
