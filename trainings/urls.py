from django.urls import path

from trainings import views

urlpatterns = [
    path('training/create', views.training_group_create, name='training_create'),
]
