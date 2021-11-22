from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from dashboard import serializers
from dashboard import utilis
from dashboard.models import UserDay, Achievement
from users.models import UserExtended


@api_view(['POST'])
def user_day_create(request):
    request.data._mutable = True
    request.data['user'] = request.user.id
    request.data._mutable = False

    serializer = serializers.UserDaySerializer(data=request.data)

    if serializer.is_valid():
        created = serializer.update_or_create(request.user.id, serializer.data)
        return Response(f"{'CREATED' if created else 'UPDATED'}", status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_day_get_all(request):
    days = UserDay.objects.all().filter(user_id=request.user.id)
    data = list(days.values())
    return JsonResponse(data, safe=False)


@api_view(['POST'])
def achievment_create(request):
    serializer = serializers.AchievmentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse({'id': serializer.instance.id}, safe=False)
    return Response({'message': serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def achievment_get(request):
    achievment = Achievement.objects.get(id=request.data['id'])
    serializer = serializers.AchievmentSerializer(achievment)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def achievment_remove(request):
    Achievement.objects.get(id=request.data['id']).delete()
    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def achievment_all(request):
    achievments = Achievement.objects.all()
    result = []
    for achievment in achievments:
        serializer = serializers.AchievmentSerializer(achievment)
        result.append(serializer.data)

    return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def achievment_user_add(request):
    achievment = Achievement.objects.get(id=request.data['achievment'])
    utilis.create_achievment_user(request.user, achievment)
    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def achievment_user_remove(request):
    achievment = Achievement.objects.get(id=request.data['achievment'])
    utilis.remove_achievment_user(request.user, achievment)
    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def achievnemt_user_get(request):
    user = UserExtended.objects.get(id=request.data['user'])
    achievments_user = list(user.achievementtuser_set.values())
    achievments = []
    for achievment_user in achievments_user:
        achievments.append(achievment_user['achievment_id'])
    return JsonResponse(achievments, safe=False, json_dumps_params={'ensure_ascii': False})
