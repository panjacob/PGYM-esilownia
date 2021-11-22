from django.urls import path

from moderator import views

urlpatterns = [
    path('application/send', views.application_send, name='moderator_application_send'),
    path('application/get', views.application_get, name='moderator_application_get'),
    path('application/all', views.application_all, name='moderator_application_all'),
    path('application/accept', views.application_accept, name='moderator_application_accept'),
    path('application/reject', views.application_reject, name='moderator_application_reject'),
]
