from django.urls import path

from diet import views

urlpatterns = [
    path('create', views.diet_group_create, name='diet_group_create'),
    path('edit', views.diet_group_edit, name='diet_group_edit'),
    path('get', views.diet_group_get, name='diet_group_get'),
    path('all', views.diet_group_all, name='diet_group_all'),
    path('remove', views.diet_group_remove, name='diet_group_remove'),
    path('participant/join', views.diet_group_join, name='diet_group_join'),
    path('participant/remove', views.diet_group_participant_remove, name='diet_group_participant_remove'),
    path('type/get', views.diet_group_type_get, name='diet_group_type_get'),
    path('type/all', views.diet_group_type_all, name='diet_group_type_all'),

    path('file/add', views.diet_group_file_add, name='diet_group_file_add'),
    path('file/remove', views.diet_group_file_remove, name='diet_group_file_remove'),
    path('image/add', views.diet_image_add, name='diet_image_add'),
    path('image/remove', views.diet_image_remove, name='diet_image_remove'),
    path('meeting/add', views.diet_meeting_add, name='diet_meeting_add'),
    path('meeting/remove', views.diet_meeting_remove, name='diet_meeting_remove'),
    path('meeting/get', views.diet_meeting_get, name='diet_meeting_get'),

    path('jitsi/join', views.diet_jitsi_join, name='diet_jitsi_join'),
    path('jitsi/leave', views.diet_jitsi_leave, name='diet_jitsi_leave'),

]
