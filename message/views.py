# Create your views here.
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from message.models import Notification
from message.serializers import MessageCreateSerializer, MessageGetSerializer, NotificationSerializer
from message.utilis import get_messages_all
from users.models import UserExtended
from users.utilis import put_sender_in_request_data


@api_view(['POST'])
def message_send(request):
    request = put_sender_in_request_data(request)
    serializer = MessageCreateSerializer(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def message_all(request):
    user1 = request.user
    user2 = UserExtended.objects.get(id=request.data['user'])

    messages = get_messages_all(user1, user2)

    begin = int(request.data.get('begin', '0'))
    end = int(request.data.get('end', '0'))

    total = len(messages)
    if begin > total:
        return Response({'message': 'begin > total is not allowed'}, status=status.HTTP_400_BAD_REQUEST)

    result = {}
    result['total'] = total
    result['messages'] = []
    for message in messages[begin:end]:
        serializer = MessageGetSerializer(instance=message)
        result['messages'].append(serializer.data)
    return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def notification_all(request):
    seen_request = request.data.get('show_seen', 'False')
    if seen_request.lower() in ['true', '1']:
        seen = True
    else:
        seen = False

    result = []
    notifications = Notification.objects.filter(user=request.user)
    print(seen)
    if not seen:
        not_seen = not seen
        print(notifications)
        notifications = notifications.filter(seen=seen)
        print(notifications)

    for notification in notifications:
        serializer = NotificationSerializer(instance=notification)
        result.append(serializer.data)

    return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def notification_seen(request):
    notification = Notification.objects.get(id=request.data['id'])
    notification.seen = True
    notification.save()

    return Response({'OK'}, status=status.HTTP_200_OK)
