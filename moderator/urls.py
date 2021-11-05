from django.urls import path

from moderator import views

urlpatterns = [
    path('application/send', views.application_send, name='moderator_application_send'),
    # path('user_day/get_all', views.user_day_get_all, name='user_day_get_all'),
]
