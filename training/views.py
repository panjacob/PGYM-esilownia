from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.settings import JITSI_SECRET
from training import models
from training.serializers import *
from training.utilis import jitsi_payload_create, jitsi_token_encode, current_milli_time
from users.utilis import put_owner_in_request_data


@api_view(['POST'])
def training_group_create(request):
    # TODO: assert user is a trainer
    request = put_owner_in_request_data(request)
    serializer = TrainingGroupSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
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
def training_group_get_all(request):
    result = []
    training_groups = TrainingGroup.objects.all()
    for training_group in training_groups:
        serializer = TrainingGroupSerializerGetAll(training_group)
        result.append(serializer.data)
    return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})


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



@api_view(['GET'])
def training_image_add(request):
    request = put_owner_in_request_data(request)
    serializer = TrainingGroupSerializerImageAdd(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response({'error': serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def training_create(request):
    # TODO: assert user is a trainer
    request = put_owner_in_request_data(request)
    serializer = TrainingSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def training_remove(request):
    # TODO assert user is a trainer
    if not Training.objects.filter(id=request.data['id']).exists():
        return Response({'Training doesnt exist'}, status=status.HTTP_400_BAD_REQUEST)
    training = Training.objects.get(id=request.data['id'])
    training.delete()
    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def training_get(request):
    training = models.Training.objects.get(id=request.data['id'])
    serializer = TrainingSerializerGet(training)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['GET'])
def training_join(request):
    user = request.user
    training = models.Training.objects.get(id=request.data['id'])
    training.participants.add(user)
    payload = jitsi_payload_create(user, training)
    token = jitsi_token_encode(JITSI_SECRET, payload)
    return Response({'token': token}, status=status.HTTP_200_OK)


@api_view(['GET'])
def training_leave(request):
    user = request.user
    training = models.Training.objects.get(id=request.data['id'])
    training.participants.remove(user)

    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def training_ping(request):
    training = models.Training.objects.get(id=request.data['id'])
    training.ping = current_milli_time()
    training.save()
    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def training_ping_get(request):
    training = models.Training.objects.get(id=request.data['id'])
    last_ping_time = current_milli_time() - training.ping
    active = last_ping_time < 60 * 1000
    return Response({'last_ping_time_ms': last_ping_time, 'active': active},
                    status=status.HTTP_200_OK)
