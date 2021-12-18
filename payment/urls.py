from django.urls import path

from payment import views

urlpatterns = [
    path('offer/all', views.offer_all, name='offer_all'),
    path('stripepk', views.stripepk, name='stripepk'),
    path('create_checkout_session', views.create_checkout_session, name='create_checkout_session'),
    path('stripe_webhook', views.stripe_webhook, name='stripe_webhook'),
    path('withdraw/create', views.withdraw_create, name='withdraw_create'),
    path('withdraw/get', views.withdraw_get, name='withdraw_get'),
]
