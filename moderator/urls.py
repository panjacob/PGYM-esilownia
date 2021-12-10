from django.urls import path

from moderator import views

urlpatterns = [
    path('application/send', views.application_send, name='moderator_application_send'),
    path('application/get', views.application_get, name='moderator_application_get'),
    path('application/all', views.application_all, name='moderator_application_all'),
    path('application/accept', views.application_accept, name='moderator_application_accept'),
    path('application/reject', views.application_reject, name='moderator_application_reject'),
    path('report/create', views.report_create, name='report_create'),
    path('report/get', views.report_get, name='report_get'),
    path('report/all', views.report_all, name='report_all'),
    path('report/edit', views.report_edit, name='report_edit'),

    path('user_ban', views.user_ban, name='user_ban'),
    path('user_unban', views.user_unban, name='user_unban'),
]
