from django.urls import path

from dashboard import views

urlpatterns = [
    path('user_day/create', views.user_day_create, name='user_day_create'),
    path('user_day/get_all', views.user_day_get_all, name='user_day_get_all'),
]
