# Create your views here.
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from message.serializers import MessageCreateSerializer,MessageGetSerializer
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

    result = []
    messages = get_messages_all(user1, user2)
    print(messages)
    for message in messages:
        serializer = MessageGetSerializer(instance=message)
        # if serializer.is_valid():
        result.append(serializer.data)
        # else:
        #     print(serializer.error_messages)
    return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})
