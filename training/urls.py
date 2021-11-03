from django.urls import path

from training import views

urlpatterns = [
    path('group/create', views.training_group_create, name='training_group_create'),
    path('group/get', views.training_group_get, name='group_get'),
    path('group/all', views.training_group_get_all, name='group_all'),
    path('group/type/get', views.training_group_type_get, name='group_type_get'),
    path('group/type/all', views.training_group_type_all, name='group_type_all'),
    path('group/participant/add', views.training_group_participant_add, name='training_group_participant_add'),
    path('group/participant/remove', views.training_group_participant_remove, name='training_group_participant_remove'),
    path('group/image/add', views.training_group_image_add, name='training_group_image_add'),
    path('group/image/remove', views.training_group_image_remove, name='training_group_image_remove'),

    path('create', views.training_create, name='training_create'),
    path('remove', views.training_remove, name='training_remove'),
    path('get', views.training_get, name='training_get'),
    path('join', views.training_join, name='training_join'),
    path('leave', views.training_leave, name='training_leave'),
    path('ping', views.training_ping, name='training_ping'),
    path('ping/get', views.training_ping_get, name='training_ping_get'),
]
