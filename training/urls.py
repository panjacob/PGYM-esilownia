from django.urls import path

from training import views

urlpatterns = [
    path('group/create', views.training_group_create, name='training_group_create'),
    path('group/get', views.training_group_get, name='group_get'),
    path('group/type/get', views.training_group_type_get, name='group_type_get'),
    path('group/type/all', views.training_group_type_all, name='group_type_all'),
    path('group/participant/add', views.training_group_participant_add, name='training_group_participant_add'),
    path('group/participant/remove', views.training_group_participant_remove, name='training_group_participant_remove'),

    path('create', views.training_create, name='training_create'),
]
