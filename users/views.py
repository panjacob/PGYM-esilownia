from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

import users.serializers as serializers
from users import utilis


@api_view(('GET',))
@permission_classes([AllowAny])
def test_connection(request):
    return Response({'message': 'Everything works fine'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def user_edit(request):
    if utilis.is_email_in_db(request.user.pk, request.data['email']):
        return Response({'message': 'Email is already in database'}, status.HTTP_400_BAD_REQUEST)

    if utilis.is_username_in_db(request.user.pk, request.data['username']):
        return Response({'message': 'Email is already in database'}, status.HTTP_400_BAD_REQUEST)

    serializer = serializers.UserEditSerializer(request.user, data=request.data)
    if serializer.is_valid():
        serializer.save(pk=request.user.id)
        return Response({'message': 'OK'}, status=status.HTTP_200_OK)
    print(serializer.error_messages)
    return Response({'message': 'Data is not valid'}, status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def user_register(request):
    serializer = serializers.UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        new_user = serializer.save()
        if new_user:
            return Response({'username': new_user.username, 'email': new_user.email}, status=status.HTTP_200_OK)
    return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_change_password(request):
    user = request.user
    serializer = serializers.UserChangePasswordSerializer(data=request.data)
    if serializer.is_valid():
        if not user.check_password(request.data['old_password']):
            return Response({'message': 'Old password is incorrect'}, status.HTTP_400_BAD_REQUEST)
        if not utilis.validate_password(request.data['new_password']):
            return Response({'message': 'New password is not secure'}, status.HTTP_400_BAD_REQUEST)
        user.set_password(request.data['new_password'])
        user.save()
    return Response({'message': 'OK'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def user_info(request):
    user = request.user
    serializer = serializers.UserInfoSerializer(user)
    return JsonResponse(serializer.data)
