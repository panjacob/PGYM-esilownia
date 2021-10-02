from django.contrib.auth import authenticate
from django.shortcuts import render
from django.http import HttpResponse

from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token


@csrf_exempt
@api_view(('GET',))
def test_connection(request):
    return Response({'message': 'Everything works fine'}, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(('POST',))
def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token = Token.objects.get(user=user)
        content = {
            'token': token.key
        }
        return Response(content)
    else:
        return Response({'message': 'Wrong username or password!'}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(('POST',))
def register(request):
    username = request.POST.get('username')
    if User.objects.get(username=username):
        return Response({'message': 'Username already exists!'}, status=status.HTTP_400_BAD_REQUEST)
    # TODO: Check if password is strong
    password = request.POST.get('password')
    # TODO: Verify if email is correct
    email = request.POST.get('email')
    firstname = request.POST.get('firstname')
    lastname = request.POST.get('lastname')
    user = User.objects.create_user(username, email, password)
    user.first_name = firstname
    user.last_name = lastname
    user.save()
    token = Token.objects.get(user=user)
    content = {
        'token': token.key
    }
    return Response(content)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    new_password = request.POST.get('new_password')
    user.set_password(new_password)
    user.save()
    return Response({'message': 'Password has been changed!'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    content = {
        'username': user.username,
        'email': user.email,
        'firstname': user.first_name,
        'lastname': user.last_name
    }
    return Response(content)
