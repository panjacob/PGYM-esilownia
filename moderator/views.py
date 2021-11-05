# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from moderator.serializers import ApplicationCreateSerializer
from users.utilis import put_owner_in_request_data


@api_view(['POST'])
def application_send(request):
    request = put_owner_in_request_data(request)
    serializer = ApplicationCreateSerializer(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
