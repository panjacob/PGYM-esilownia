from django.db.models import Q

from message.models import Message, Notification


def get_messages_all(user1, user2):
    messages = Message.objects.filter((Q(sender=user1) | Q(sender=user2) | Q(receiver=user1) | Q(receiver=user2)))
    messages = messages.order_by('time')
    return messages


def notification_send(user, body, kind):
    notification = Notification.objects.create(user=user, body=body, kind=kind)
    return notification
