from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

import training.serializers as serializers
from users.utilis import put_owner_in_request_data
from training import models


@api_view(['POST'])
def training_group_create(request):
    # TODO: assert user is a trainer
    request = put_owner_in_request_data(request)
    serializer = serializers.TrainingGroupSerializerCreate(data=request.data)

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

    serializer = serializers.TrainingGroupSerializerGet(training_group)
    return JsonResponse(serializer.data)


# @api_view(['POST'])
# def training_group_participant_add(request):
#     participant = models.UserExtended.objects.get(id=request.data['participant'])
#     training_group = models.TrainingGroup.objects.get(id=request.data['training_group'])
#     #TODO: Assert request.user is owner of training group
#     training_group.participants.add(participant)
#     training_group.save()



# @api_view(['POST'])
# def training_group_participant_remove():
#     return None


def training_create(request):
    pass


def training_remove(request):
    pass


@api_view(['GET'])
def training_group_type_get(request):
    training_group_type = models.TrainingGroupType.objects.get(id=request.data['id'])
    serializer = serializers.TrainingGroupTypesSerializer(training_group_type)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
