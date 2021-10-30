from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from dashboard import serializers
from dashboard.models import UserDay


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


@api_view(['GET'])
def user_day_get_all(request):
    days = UserDay.objects.all().filter(user_id=request.user.id)
    data = list(days.values())
    return JsonResponse(data, safe=False)
