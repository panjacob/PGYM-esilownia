from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from diet.serializers import DietGroupSerializerCreate
from users.utilis import put_owner_in_request_data

MAX_PING_ACTIVE_SECONDS = 30


@api_view(['POST'])
# Trainer required
def diet_group_create(request):
    request = put_owner_in_request_data(request)
    serializer = DietGroupSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# # Trainer required
# def training_group_edit(request):
#     request = put_owner_in_request_data(request)
#     instance = TrainingGroup.objects.get(id=request.data['id'])
#     serializer = TrainingGroupSerializerCreate(instance=instance, data=request.data)
#
#     if serializer.is_valid():
#         if serializer.save():
#             return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(['POST'])
# def training_group_join(request):
#     user = request.user
#     training_group = models.TrainingGroup.objects.get(id=request.data['training_group'])
#     owner = training_group.owner
#     price, days_to_add = get_price_and_days_to_add(request.data['payment_type'], training_group)
#
#     if price is None and days_to_add is None:
#         return Response({'Payment type is invalid'}, status=status.HTTP_400_BAD_REQUEST)
#
#     if user.money < price:
#         return Response({'User does not have enough money'}, status=status.HTTP_400_BAD_REQUEST)
#
#     training_group_participant, _ = models.TrainingGroupParticipant.objects.get_or_create(user=user,
#                                                                                           training_group=training_group)
#
#     participant_extend_subscription(training_group_participant, days_to_add)
#     user1_give_money_user2_training(user, owner, price)
#
#     return Response({'OK'}, status=status.HTTP_200_OK)
#
#
# @api_view(['POST'])
# # @training_group_owner_required()
# def training_group_participant_remove(request):
#     training_group = models.TrainingGroup.objects.get(id=request.data['training_group'])
#     models.TrainingGroupParticipant.objects.get(user=request.data['user'], training_group=training_group).delete()
#     return Response({'OK'}, status=status.HTTP_200_OK)
#
#
# @api_view(['POST'])
# def training_group_get(request):
#     training_group = models.TrainingGroup.objects.get(id=request.data['id'])
#     serializer = TrainingGroupSerializerGet(training_group)
#     result = serializer.data
#     result['images'] = []
#     result['videos'] = []
#     result['trainings'] = []
#     result['participants'] = []
#
#     for training_group_image in training_group.traininggroupimage_set.all():
#         try:
#             result['images'].append({'id': training_group_image.id, 'url': training_group_image.image.url})
#         except Exception as e:
#             print(e)
#     for training_group_video in training_group.traininggroupvideo_set.all():
#         try:
#             result['videos'].append({'id': training_group_video.id, 'url': training_group_video.video.url})
#         except Exception as e:
#             print(e)
#     for training in training_group.training_set.all():
#         result['trainings'] += {training.id}
#     for participant in training_group.traininggroupparticipant_set.all():
#         result['participants'].append(participantsSerializerGet(participant))
#     return JsonResponse(result)
#
#
# @api_view(['POST'])
# @training_group_owner_required()
# def training_group_remove(request):
#     training_group = models.TrainingGroup.objects.get(id=request.data['id'])
#     training_group.delete()
#
#     return Response({'OK'}, status=status.HTTP_200_OK)
#
#
# @api_view(['POST'])
# def training_group_all(request):
#     result = []
#     training_groups = TrainingGroup.objects.all()
#     for training_group in training_groups:
#         serializer = TrainingGroupSerializerGetAll(training_group)
#         result.append(serializer.data)
#     return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})
#
#
# @api_view(['POST'])
# def training_group_type_get(request):
#     training_group_type = models.TrainingGroupType.objects.get(id=request.data['id'])
#     serializer = TrainingGroupTypesSerializer(training_group_type)
#     return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
#
#
# @api_view(['POST'])
# def training_group_type_all(request):
#     training_group_types = models.TrainingGroupType.objects.all()
#     response = []
#     for training_group_type in training_group_types:
#         serializer = TrainingGroupTypesSerializer(training_group_type)
#         response.append(serializer.data)
#     return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})
#
#
# @api_view(['POST'])
# @training_group_owner_required()
# def training_group_image_add(request):
#     request = put_owner_in_request_data(request)
#     serializer = TrainingGroupSerializerImageAdd(data=request.data)
#
#     if serializer.is_valid():
#         if serializer.save():
#             return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
#     return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(['POST'])
# def training_group_image_remove(request):
#     image_id = request.data['id']
#     if TrainingGroupImage.objects.filter(id=image_id).exists():
#         TrainingGroupImage.objects.get(id=image_id).delete()
#         return Response({'OK'}, status=status.HTTP_200_OK)
#     return Response({'error': 'Image doesnt exist or problems when deleting'}, status=status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(['POST'])
# @training_group_owner_required()
# def training_group_video_add(request):
#     request = put_owner_in_request_data(request)
#     serializer = TrainingGroupSerializerVideoAdd(data=request.data)
#
#     if serializer.is_valid():
#         if serializer.save():
#             return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
#     return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(['POST'])
# def training_group_video_remove(request):
#     video_id = request.data['id']
#     print(video_id)
#     if TrainingGroupVideo.objects.filter(id=video_id).exists():
#         TrainingGroupVideo.objects.get(id=video_id).delete()
#         return Response({'OK'}, status=status.HTTP_200_OK)
#     return Response({'error': 'Video doesnt exist or problems when deleting'}, status=status.HTTP_400_BAD_REQUEST)