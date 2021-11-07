from datetime import timedelta

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.settings import JITSI_SECRET
from training import models
from training.serializers import *
from training.utilis import jitsi_payload_create, jitsi_token_encode, current_milli_time, training_group_owner_required, \
    training_owner_required
from users.utilis import put_owner_in_request_data


@api_view(['POST'])
# Trainer required
def training_group_create(request):
    request = put_owner_in_request_data(request)
    serializer = TrainingGroupSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def training_group_join(request):
    training_group = models.TrainingGroup.objects.get(id=request.data['training_group'])
    payment_type = request.data['payment_type']
    if payment_type == '0':
        price = training_group.price_day
        days_to_add = 1
    elif payment_type == '1':
        price = training_group.price_week
        days_to_add = 7
    elif payment_type == '2':
        price = training_group.price_month
        days_to_add = 30
    else:
        return Response({'payment_type is not specified'}, status=status.HTTP_400_BAD_REQUEST)

    user = request.user
    if user.money < price:
        return Response({'User does not have enough money'}, status=status.HTTP_400_BAD_REQUEST)

    training_group_participant, _ = models.TrainingGroupParticipant.objects.get_or_create(user=user,
                                                                                          training_group=training_group)
    training_group_participant.subscription_end += timedelta(days_to_add)
    training_group_participant.save()
    user.money -= price
    user.save()

    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@training_group_owner_required()
def training_group_participant_remove(request):
    training_group = models.TrainingGroup.objects.get(id=request.data['training_group'])
    if request.user.id is not training_group.owner_id:
        return Response('Current user is not owner of a group', status=status.HTTP_400_BAD_REQUEST)
    training_group.participants.remove_path(request.data['participant'])
    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def training_group_get(request):
    training_group = models.TrainingGroup.objects.get(id=request.data['id'])
    serializer = TrainingGroupSerializerGet(training_group)
    result = serializer.data
    result['images'] = []
    result['trainings'] = []
    result['participants'] = []

    for training_group_image in training_group.traininggroupimage_set.all():
        result['images'] += {training_group_image.image.url}
    for training in training_group.training_set.all():
        result['trainings'] += {training.id}
    for participant in training_group.traininggroupparticipant_set.all():
        result['participants'].append(participantsSerializerGet(participant))
    return JsonResponse(result)


@api_view(['POST'])
@training_group_owner_required()
def training_group_remove(request):
    training_group = models.TrainingGroup.objects.get(id=request.data['id'])
    training_group.delete()

    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def training_group_all(request):
    result = []
    training_groups = TrainingGroup.objects.all()
    for training_group in training_groups:
        serializer = TrainingGroupSerializerGetAll(training_group)
        result.append(serializer.data)
    return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def training_group_type_get(request):
    training_group_type = models.TrainingGroupType.objects.get(id=request.data['id'])
    serializer = TrainingGroupTypesSerializer(training_group_type)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def training_group_type_all(request):
    training_group_types = models.TrainingGroupType.objects.all()
    response = []
    for training_group_type in training_group_types:
        serializer = TrainingGroupTypesSerializer(training_group_type)
        response.append(serializer.data)
    return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
@training_group_owner_required()
def training_group_image_add(request):
    request = put_owner_in_request_data(request)
    serializer = TrainingGroupSerializerImageAdd(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response({'error': serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
# Tu musi być cos innego
# @training_group_owner_required()
def training_group_image_remove(request):
    image_id = request.data['id']
    if TrainingGroupImage.objects.filter(id=image_id).exists():
        TrainingGroupImage.objects.get(id=image_id).delete()
        return Response({'OK'}, status=status.HTTP_200_OK)
    return Response({'error': 'Image doesnt exist or problems when deleting'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@training_group_owner_required()
def training_create(request):
    request = put_owner_in_request_data(request)
    serializer = TrainingSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@training_owner_required()
def training_remove(request):
    if not Training.objects.filter(id=request.data['id']).exists():
        return Response({'Training doesnt exist'}, status=status.HTTP_400_BAD_REQUEST)
    training = Training.objects.get(id=request.data['id'])
    training.delete()
    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def training_get(request):
    training = models.Training.objects.get(id=request.data['id'])
    serializer = TrainingSerializerGet(training)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def training_join(request):
    user = request.user
    training = models.Training.objects.get(id=request.data['id'])
    training.participants.add(user)
    payload = jitsi_payload_create(user, training)
    token = jitsi_token_encode(JITSI_SECRET, payload)
    return Response({'token': token}, status=status.HTTP_200_OK)


@api_view(['POST'])
def training_leave(request):
    user = request.user
    training = models.Training.objects.get(id=request.data['id'])
    training.participants.remove_path(user)

    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def training_ping(request):
    training = models.Training.objects.get(id=request.data['id'])
    training.ping = current_milli_time()
    training.save()
    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def training_ping_get(request):
    training = models.Training.objects.get(id=request.data['id'])
    last_ping_time = current_milli_time() - training.ping
    active = last_ping_time < 60 * 1000
    return Response({'last_ping_time_ms': last_ping_time, 'active': active},
                    status=status.HTTP_200_OK)
