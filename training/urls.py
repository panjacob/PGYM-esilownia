from django.urls import path

from training import views

urlpatterns = [
    path('training/group/create', views.training_group_create, name='training_group_create'),
    path('training/add_participant', views.training_group_add_participant, name='training_add_participant'),
    path('training/remove_participant', views.training_group_remove_participant, name='training_remove_participant'),
]
