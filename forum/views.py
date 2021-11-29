from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from forum.serializers import TopicSerializerCreate, TopicSerializerGet, TopicSerializerAll
from users.utilis import put_owner_in_request_data
from forum.models import Topic


@api_view(['POST'])
def topic_create(request):
    request = put_owner_in_request_data(request)
    serializer = TopicSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def topic_get(request):
    topic = Topic.objects.get(id=request.data['id'])
    serializer = TopicSerializerGet(instance=topic)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def topic_all(request):
    topics = Topic.objects.all()
    result = [TopicSerializerAll(instance=x).data for x in topics]
    return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})

