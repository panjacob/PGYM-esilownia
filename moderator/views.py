# Create your views here.
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from moderator import models
from moderator.serializers import ApplicationCreateSerializer, ApplicationGetSerializer
from users.utilis import put_owner_in_request_data


@api_view(['POST'])
def application_send(request):
    request = put_owner_in_request_data(request)
    serializer = ApplicationCreateSerializer(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def application_get(request):
    application = models.Application.objects.get(id=request.data['id'])
    serializer = ApplicationGetSerializer(application)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['GET'])
def application_all(request):
    applications = models.Application.objects.all()
    result = []
    for application in applications:
        serializer = ApplicationGetSerializer(application)
        result.append(serializer.data)

    return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})
