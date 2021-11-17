from django.apps import AppConfig


def init_offer(name, price, coins):
    try:
        from payment.models import Offer
        offer, created = Offer.objects.get_or_create(name=name, price=price, coins=coins)
        if created:
            offer.save()
    except Exception as e:
        pass


class PaymentConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'payment'

    def ready(self):
        init_offer('Basic', 20, 20)
        init_offer('Premium', 50, 60)
        init_offer('VIP', 200, 250)
