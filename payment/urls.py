from django.urls import path

from payment import views

urlpatterns = [
    # path('transaction/create', views.transaction_create, name='transaction_create'),
    # path('transaction/all', views.transaction_all, name='transaction_all'),
    path('offer/all', views.offer_all, name='offer_all'),
    path('stripepk', views.stripepk, name='stripepk'),
    path('create_checkout_session', views.create_checkout_session, name='create_checkout_session'),
    path('stripe_webhook', views.stripe_webhook, name='stripe_webhook'),
]
