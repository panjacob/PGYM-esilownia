# Create your views here.
from django.http import JsonResponse
import datetime
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from message.utilis import notification_send
from moderator import models
from moderator.serializers import ApplicationCreateSerializer, ApplicationGetSerializer, ReportCreateSerializer, \
    ReportGetSerializer, ReportEditSerializer
from users.utilis import put_owner_in_request_data


@api_view(['POST'])
def application_send(request):
    request = put_owner_in_request_data(request)
    serializer = ApplicationCreateSerializer(data=request.data)

    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def application_get(request):
    application = models.Application.objects.get(id=request.data['id'])
    serializer = ApplicationGetSerializer(application)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def application_all(request):
    applications = models.Application.objects.all()
    result = []
    for application in applications:
        serializer = ApplicationGetSerializer(application)
        result.append(serializer.data)

    return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def application_accept(request):
    application = models.Application.objects.get(id=request.data['id'])
    application.status = application.ACCEPTED
    application.save()
    body_user = {
        'message': "Twoja zgłoszenie zostało rozpatrzone pomyślnie"
    }
    notification_send(user=application.owner, body=body_user, kind=1)

    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def application_reject(request):
    application = models.Application.objects.get(id=request.data['id'])
    application.status = application.REJECTED
    application.save()
    body_user = {
        'message': "Twoja zgłoszenie zostało rozpatrzone negatywnie"
    }
    notification_send(user=application.owner, body=body_user, kind=2)

    return Response({'OK'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def report_create(request):
    request = put_owner_in_request_data(request)
    serializer = ReportCreateSerializer(data=request.data)
    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def report_get(request):
    report = models.Report.objects.get(id=request.data['id'])
    serializer = ReportGetSerializer(instance=report)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def report_all(request):
    reports = models.Report.objects.all().order_by('-date')
    result = [ReportGetSerializer(instance=x).data for x in reports]
    return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
def report_edit(request):
    report = models.Report.objects.get(id=request.data['id'])
    serializer = ReportEditSerializer(instance=report, data=request.data)
    if serializer.is_valid():
        if serializer.save():
            return Response({'id': serializer.instance.id}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_ban(request):
    days = int(request.data['days'])
    user = request.user
    user.ban_date_expiration = datetime.datetime.now() + datetime.timedelta(days)
    user.save()
    return Response({'message': f"User is banned until {user.ban_date_expiration}"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def user_unban(request):
    user = request.user
    user.ban_date_expiration = None
    user.save()
    return Response({'message': f"User is unbanned"}, status=status.HTTP_200_OK)
