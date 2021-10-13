from django.urls import path

from users import views

urlpatterns = [
    path('test/', views.test_connection, name='test'),
    path('info/', views.user_info, name='info'),
    path('register/', views.user_register, name='register'),
    path('edit/', views.user_edit, name='edit'),
    path('logout/', views.user_logout, name='logout'),
    path('change_password/', views.user_change_password, name='change_password'),
]
