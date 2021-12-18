import datetime
from django.utils import timezone
from pprint import pprint

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

import users.serializers as serializers
from diet.models import DietGroupParticipant
from users import utilis
from users.models import UserExtended
from users.utilis import superuser_required, moderator_required
from training.models import TrainingGroupParticipant
from message.utilis import notification_send

from drf_social_oauth2.views import TokenView


def is_banned(user):
    if user.ban_date_expiration is None:
        return False
    return user.ban_date_expiration.timestamp() > datetime.datetime.now().timestamp()


@api_view((['POST']))
@permission_classes([AllowAny])
def auth_token_wrapper_check_ban(request):
    if request.data['grant_type'] == 'password':
        email = request.data['username']
        user = UserExtended.objects.get(email=email)
        if is_banned(user):
            return Response({'message': 'User is banned', 'ban_date_expiration': user.ban_date_expiration},
                            status=status.HTTP_200_OK)

    return TokenView().post(request=request)


@api_view((['POST']))
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
    print(serializer.errors)
    return Response({'message': 'Data is not valid'}, status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def user_register(request):
    serializer = serializers.UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        new_user = serializer.save()
        if new_user:
            notification_body = {'message': 'Tego stringa trzeba zamienić w JSONA'}
            notification = notification_send(new_user, notification_body, 0)
            return Response({'id': new_user.id, 'username': new_user.username, 'email': new_user.email},
                            status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


@csrf_exempt
@api_view(['POST'])
def user_info(request):
    user = request.user
    serializer = serializers.UserInfoSerializer(user)
    result = serializer.data
    result['trainings'] = []
    result['diets'] = []
    trainings_group_participant = TrainingGroupParticipant.objects.filter(user=user).all()
    for training_group in trainings_group_participant:
        result['trainings'].append(
            {'training_group': training_group.training_group.id, 'subscription_end': training_group.subscription_end})
    diet_group_participants = DietGroupParticipant.objects.filter(user=user).all()
    for diet in diet_group_participants:
        result['diets'].append({
            'diet': diet.id, 'subscription_end': diet.subscription_end
        })

    return JsonResponse(result, safe=False)


@api_view(['POST'])
@superuser_required()
def user_set_moderator(request):
    user = UserExtended.objects.get(id=request.data['id'])
    user.is_moderator = request.data['value'].title()
    user.save()
    return Response({'message': 'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@moderator_required()
def user_set_coach(request):
    user = UserExtended.objects.get(id=request.data['id'])
    user.is_coach = request.data['value'].title()
    user.save()
    return Response({'message': 'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@moderator_required()
def user_set_dietician(request):
    user = UserExtended.objects.get(id=request.data['id'])
    user.is_dietician = request.data['value'].title()
    user.save()
    return Response({'message': 'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def user_photo_add(request):
    if not request.FILES:
        return Response({'error': 'request.FILES is empty'}, status=status.HTTP_400_BAD_REQUEST)
    serializer = serializers.UserAddProfilePhotoSerializer(request.user, data=request.data)

    if serializer.is_valid():
        if serializer.save(pk=request.user.id):
            print(serializer.instance.profile_photo)
            return Response({'OK': str(serializer.instance.profile_photo)}, status=status.HTTP_200_OK)
    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_photo_remove(request):
    request.user.profile_photo.delete()
    return Response({'OK'}, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
def user_get(request):
    if not UserExtended.objects.filter(id=request.data['id']).exists():
        return Response({'message': 'User doesnt exist'}, status=status.HTTP_400_BAD_REQUEST)
    user = UserExtended.objects.get(id=request.data['id'])
    serializer = serializers.UserGetSerializer(user)
    return JsonResponse(serializer.data)


# TODO: do wyrzucenia?
@csrf_exempt
@api_view(['POST'])
# moderator_required()
def user_get_moderator(request):
    if not UserExtended.objects.filter(id=request.data['id']).exists():
        return Response({'message': 'User doesnt exist'}, status=status.HTTP_400_BAD_REQUEST)
    user = UserExtended.objects.get(id=request.data['id'])
    serializer = serializers.UserGetModeratorSerializer(user)
    return JsonResponse(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    email = request.data['email']
    try:
        user = UserExtended.objects.get(email=email)
    except UserExtended.DoesNotExist:
        return Response(status=200)
    token = utilis.generate_password_reset_token()
    user.password_reset_token = token
    user.password_reset_token_time = datetime.datetime.now(tz=timezone.get_current_timezone())
    user.save()
    html_message = utilis.generate_password_reset_email_body(request.get_host(), token)
    utilis.send_html_mail('PGYM - Reset Hasła', html_message, email)
    return Response(status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset(request):
    token = request.data['token']
    try:
        user = UserExtended.objects.get(password_reset_token=token)
    except UserExtended.DoesNotExist:
        return Response({'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
    password = request.data['password']
    if not utilis.validate_password(password):
        return Response({'message': 'New password is not secure'}, status.HTTP_400_BAD_REQUEST)
    if (user.password_reset_token_time + datetime.timedelta(hours=1) < datetime.datetime.now(
            tz=timezone.get_current_timezone())):
        return Response({'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
    user.password_reset_token = None
    user.password_reset_token_time = None
    user.set_password(password)
    user.save()
    return Response({'message': 'OK'}, status=status.HTTP_200_OK)
