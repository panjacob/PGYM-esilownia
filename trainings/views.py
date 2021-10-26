from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

import trainings.serializers as serializers
from users.utilis import put_owner_in_request_data


@api_view(['POST'])
@permission_classes([AllowAny])
def training_group_create(request):
    request = put_owner_in_request_data(request)
    serializer = serializers.TrainingGroupSerializerCreate(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'OK'}, status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)

# TODO
def training_group_add_participant(request):
    return Response({'OK'}, status=status.HTTP_200_OK)


def training_group_remove_participant(request):
    pass


def training_create(request):
    pass


def training_remove(request):
    pass
