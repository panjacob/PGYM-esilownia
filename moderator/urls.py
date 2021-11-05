from django.urls import path

from moderator import views

urlpatterns = [
    path('application/send', views.application_send, name='moderator_application_send'),
    path('application/get', views.application_get, name='moderator_application_get'),
    path('application/all', views.application_all, name='moderator_application_all'),
    # path('user_day/get_all', views.user_day_get_all, name='user_day_get_all'),
]
