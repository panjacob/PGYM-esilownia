from datetime import timedelta

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.settings import JITSI_SECRET
from training import models
from training.serializers import *
from training.utilis import jitsi_payload_create, jitsi_token_encode, current_milli_time, training_group_owner_required, \
    training_owner_required, get_price_and_days_to_add, participant_extend_subscription
from users.utilis import put_owner_in_request_data
from message.utilis import notification_send
from users.models import UserExtended
from payment.utilis import user1_give_money_user2_training

MAX_PING_ACTIVE_SECONDS = 30


@api_view(['POST'])
# Trainer required
def training_group_create(request):
    request = put_owner_in_request_data(request)
    serializer = TrainingGroupSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
# Trainer required
def training_group_edit(request):
    request = put_owner_in_request_data(request)
    instance = TrainingGroup.objects.get(id=request.data['id'])
    serializer = TrainingGroupSerializerCreate(instance=instance, data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def training_group_join(request):
    user = request.user
    training_group = models.TrainingGroup.objects.get(id=request.data['training_group'])
    owner = training_group.owner
    price, days_to_add = get_price_and_days_to_add(request.data['payment_type'], training_group)

    if price is None and days_to_add is None:
        return Response({'Payment type is invalid'}, status=status.HTTP_400_BAD_REQUEST)

    if user.money < price:
        return Response({'User does not have enough money'}, status=status.HTTP_400_BAD_REQUEST)

    training_group_participant, _ = models.TrainingGroupParticipant.objects.get_or_create(user=user,
                                                                                          training_group=training_group)

    participant_extend_subscription(training_group_participant, days_to_add)
    user1_give_money_user2_training(user, owner, price)



    body_user = {
        'training_group': training_group.id,
        'training_group_image': training_group.image.url if training_group.image else "",
        'training_group_name': training_group.title,
        'bought_days': days_to_add
    }
    notification_send(user=user, body=body_user, kind=4)

    body_owner = {
        'training_group': training_group.id,
        'training_group_image': training_group.image.url if training_group.image else "",
        'training_group_name': training_group.title,
        'bought_days': days_to_add,
        'user_who_bought': user.id,
        'user_who_bought_name': f"{user.first_name} {user.last_name}",
    }
    notification_send(user=owner, body=body_owner, kind=5)

    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
# @training_group_owner_required()
def training_group_participant_remove(request):
    training_group = models.TrainingGroup.objects.get(id=request.data['training_group'])
    models.TrainingGroupParticipant.objects.get(user=request.data['user'], training_group=training_group).delete()
    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def training_group_get(request):
    training_group = models.TrainingGroup.objects.get(id=request.data['id'])
    serializer = TrainingGroupSerializerGet(training_group)
    result = serializer.data
    result['images'] = []
    result['videos'] = []
    result['trainings'] = []
    result['participants'] = []

    for training_group_image in training_group.traininggroupimage_set.all():
        try:
            result['images'].append({'id': training_group_image.id, 'url': training_group_image.image.url})
        except Exception as e:
            print(e)
    for training_group_video in training_group.traininggroupvideo_set.all():
        try:
            result['videos'].append({'id': training_group_video.id, 'url': training_group_video.video.url})
        except Exception as e:
            print(e)
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
    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def training_group_image_remove(request):
    image_id = request.data['id']
    if TrainingGroupImage.objects.filter(id=image_id).exists():
        TrainingGroupImage.objects.get(id=image_id).delete()
        return Response({'OK'}, status=status.HTTP_200_OK)
    return Response({'error': 'Image doesnt exist or problems when deleting'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@training_group_owner_required()
def training_group_video_add(request):
    request = put_owner_in_request_data(request)
    serializer = TrainingGroupSerializerVideoAdd(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def training_group_video_remove(request):
    video_id = request.data['id']
    print(video_id)
    if TrainingGroupVideo.objects.filter(id=video_id).exists():
        TrainingGroupVideo.objects.get(id=video_id).delete()
        return Response({'OK'}, status=status.HTTP_200_OK)
    return Response({'error': 'Video doesnt exist or problems when deleting'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@training_group_owner_required()
def training_create(request):
    request = put_owner_in_request_data(request)
    serializer = TrainingSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@training_owner_required()
def training_edit(request):
    request = put_owner_in_request_data(request)
    instance = Training.objects.get(id=request.data['id'])
    serializer = TrainingSerializerEdit(instance=instance, data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    training.participants.remove(user)

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
    active = last_ping_time < MAX_PING_ACTIVE_SECONDS * 1000
    return Response({'last_ping_time_ms': last_ping_time, 'active': active},
                    status=status.HTTP_200_OK)


@api_view(['POST'])
# @training_group_owner_required()
def training_file_add(request):
    instance = Training.objects.get(id=request.data['id'])
    serializer = TrainingSerializerFile(instance=instance, data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def training_file_remove(request):
    instance = Training.objects.get(id=request.data['id'])
    instance.file.delete()
    return Response('OK', status=status.HTTP_200_OK)


@api_view(['POST'])
def training_group_invite(request):
    user_receiver = UserExtended.objects.get(id=request.data['user'])
    body = {
        'user_sender': request.user.id,
        'training_group': request.data['training_group']
    }
    notification_send(user=user_receiver, body=body, kind=3)

    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def training_active_user(request):
    training_group_participant = models.TrainingGroupParticipant.objects.all().filter(user=request.user)
    training_groups = [x.training_group for x in training_group_participant]
    training_group_owner = TrainingGroup.objects.all().filter(owner=request.user).all()
    training_groups += training_group_owner
    trainings = []
    for x in training_groups:
        trainings += x.training_set.all()
    # trainings.filter(ping__gt=current_milli_time() - MAX_PING_ACTIVE_SECONDS * 1000)
    ping_val = current_milli_time() - MAX_PING_ACTIVE_SECONDS * 1000
    trainings_active = [x for x in trainings if x.ping > ping_val]
    result = [training.id for training in trainings_active]
    result_no_duplicates = list(dict.fromkeys(result))
    return JsonResponse(result_no_duplicates, safe=False, json_dumps_params={'ensure_ascii': False})
