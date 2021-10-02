from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_connection, name='test'),
    path('user/', views.user_info, name='index'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('change_password/', views.change_password, name='change-password'),
]
