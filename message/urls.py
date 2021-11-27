from django.urls import path

from message import views

urlpatterns = [
    path('send', views.message_send, name='message_send'),
    path('send_admin', views.message_send_admin, name='message_send_admin'),
    path('get', views.message_all, name='messages_get'),
    path('users', views.message_users, name='messages_users'),

    path('notification/all', views.notification_all, name='notification_all'),
    path('notification/seen', views.notification_seen, name='notification_seen'),
    path('notification/send', views.notification_send, name='notification_send'),

]
