from django.urls import path

from message import views

urlpatterns = [
    path('send', views.message_send, name='message_send'),
    path('get', views.message_all, name='messages_get'),
]
