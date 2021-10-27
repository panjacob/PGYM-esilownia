from django.urls import path

from training import views

urlpatterns = [
    path('group/create', views.training_group_create, name='training_group_create'),
    path('group/get', views.training_group_get, name='group_get'),
    path('group/type/get', views.training_group_type_get, name='group_type_get'),

    path('add_participant', views.training_group_add_participant, name='training_add_participant'),
    path('remove_participant', views.training_group_remove_participant, name='training_remove_participant'),

]
