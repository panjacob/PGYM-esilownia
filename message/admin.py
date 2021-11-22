# Register your models here.
from django.contrib import admin

from message.models import Message, Notification


@admin.register(Message)
class AdminMessage(admin.ModelAdmin):
    model = Message
    list_display = ['id', 'sender', 'receiver', 'time', 'message']


@admin.register(Notification)
class AdminNotification(admin.ModelAdmin):
    model = Notification
    list_display = ['id', 'kind', 'body', 'time', 'seen']
