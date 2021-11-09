from django.shortcuts import render

# Create your views here.

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.utilis import put_owner_in_request_data, put_sender_in_request_data
from message.serializers import MessageCreateSerializer
from users.models import UserExtended


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



    serializer = MessageCreateSerializer(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
