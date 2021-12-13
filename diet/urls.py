from django.urls import path

from diet import views

urlpatterns = [
    path('group/create', views.diet_group_create, name='diet_group_create'),
    path('group/edit', views.diet_group_edit, name='diet_group_edit'),
    path('group/get', views.diet_group_get, name='diet_group_get'),
    path('group/all', views.diet_group_all, name='diet_group_all'),
    path('group/remove', views.diet_group_remove, name='diet_group_remove'),
    path('group/participant/join', views.diet_group_join, name='diet_group_join'),
    path('group/participant/remove', views.diet_group_participant_remove, name='diet_group_participant_remove'),
    path('group/type/get', views.diet_group_type_get, name='diet_group_type_get'),
    path('group/type/all', views.diet_group_type_all, name='diet_group_type_all'),

    path('group/file/add', views.diet_group_file_add, name='diet_group_file_add'),
]
