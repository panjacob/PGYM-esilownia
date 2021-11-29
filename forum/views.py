from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from forum.serializers import TopicSerializerCreate
from users.utilis import put_owner_in_request_data


@api_view(['POST'])
def topic_create(request):
    request = put_owner_in_request_data(request)
    serializer = TopicSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


