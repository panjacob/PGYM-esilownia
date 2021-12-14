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

    path('remove', views.diet_group_file_remove, name='diet_group_file_remove'),


]
