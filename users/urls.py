from django.urls import path
from users import views

urlpatterns = [
    path('test/', views.test_connection, name='test'),
    path('info/', views.user_info, name='user_info'),
    path('register/', views.user_register, name='register'),
    path('logout/', views.user_logout, name='logout'),
]
