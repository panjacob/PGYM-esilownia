from django.urls import path

from users import views

urlpatterns = [
    path('test/', views.test_connection, name='test'),
    path('info/', views.user_info, name='info'),
    path('register/', views.user_register, name='register'),
    path('edit/', views.user_edit, name='edit'),
    path('get/', views.user_get, name='get'),
    path('get_moderator/', views.user_get_moderator, name='get_moderator'),
    # path('logout/', views.user_logout, name='logout'),
    path('change_password/', views.user_change_password, name='change_password'),
    path('set_moderator/', views.user_set_moderator, name='set_moderator'),
    path('set_coach/', views.user_set_coach, name='set_coach'),
    path('set_dietician/', views.user_set_dietician, name='set_dietician'),
    path('photo/add', views.user_photo_add, name='photo_add'),
    path('photo/remove', views.user_photo_remove, name='photo_remove'),
    path('password_reset_request/', views.password_reset_request, name='password_reset_request'),
    path('password_reset/', views.password_reset, name='password_reset'),
]
