from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from dashboard import serializers
from dashboard.models import UserDay, Achievement


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
    # request = put_owner_in_request_data(request)
    print(request.data)
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

