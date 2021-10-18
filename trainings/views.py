from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

import trainings.serializers as serializers


@api_view(['POST'])
@permission_classes([AllowAny])
def training_create(request):
    serializer = serializers.TrainingGroupSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({'It works fine :)'}, status=status.HTTP_201_CREATED)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
