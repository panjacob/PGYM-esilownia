from django.apps import AppConfig


def init_offer(stripe_price_id, name, price, coins):
    try:
        from payment.models import Offer
        offer, created = Offer.objects.get_or_create(stripe_price_id=stripe_price_id, name=name, price=price, coins=coins)
        if created:
            offer.save()
    except Exception as e:
        pass


class PaymentConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'payment'

    def ready(self):
        init_offer('price_1K3OTcLydeVK0fA9M1RVokYU', 'Basic', 20, 20)
        init_offer('price_1K3OTcLydeVK0fA9ZsK0aDa8', 'Premium', 50, 60)
        init_offer('price_1K3OTcLydeVK0fA9OLgLsELK', 'VIP', 200, 250)
