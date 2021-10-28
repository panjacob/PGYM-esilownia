from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from training import models
from training.serializers import *
from users.utilis import put_owner_in_request_data


@api_view(['POST'])
def training_group_create(request):
    # TODO: assert user is a trainer
    request = put_owner_in_request_data(request)
    serializer = TrainingGroupSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'OK'}, status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def training_group_participant_add(request):
    training_group = models.TrainingGroup.objects.get(id=request.data['training_group'])
    if request.user.id is not training_group.owner_id:
        return Response('Current user is not owner of a group', status=status.HTTP_400_BAD_REQUEST)
    training_group.participants.add(request.data['participant'])
    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def training_group_participant_remove(request):
    training_group = models.TrainingGroup.objects.get(id=request.data['training_group'])
    if request.user.id is not training_group.owner_id:
        return Response('Current user is not owner of a group', status=status.HTTP_400_BAD_REQUEST)
    training_group.participants.remove(request.data['participant'])
    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def training_group_get(request):
    training_group = models.TrainingGroup.objects.get(id=request.data['id'])

    serializer = TrainingGroupSerializerGet(training_group)
    return JsonResponse(serializer.data)


@api_view(['GET'])
def training_group_type_get(request):
    training_group_type = models.TrainingGroupType.objects.get(id=request.data['id'])
    serializer = TrainingGroupTypesSerializer(training_group_type)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['GET'])
def training_group_type_all(request):
    training_group_types = models.TrainingGroupType.objects.all()
    response = []
    for training_group_type in training_group_types:
        serializer = TrainingGroupTypesSerializer(training_group_type)
        response.append(serializer.data)
    return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def training_create(request):
    # TODO: assert user is a trainer
    request = put_owner_in_request_data(request)
    serializer = TrainingSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'OK'}, status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def training_remove(request):
    # TODO assert user is a trainer
    if not Training.objects.filter(id=request.data['id']).exists():
        return Response({'Training doesnt exist'}, status=status.HTTP_400_BAD_REQUEST)
    training = Training.objects.get(id=request.data['id'])
    training.delete()
    return Response({'OK'}, status=status.HTTP_200_OK)

def training_participant_add(request):
    pass
