from django.utils.crypto import get_random_string
from payment import models
from django.db import transaction


# code = get_random_string(5)


def random_string():
    return get_random_string(16)


@transaction.atomic
def create_transaction(user, offer_id, stripe_pi_id):
    offer = models.Offer.objects.get(id=offer_id)
    transaction = models.Transaction.objects.create(user=user, payed=offer.price, purchased=offer.coins, stripe_pi_id=stripe_pi_id)
    user.money += offer.coins
    user.save()
    transaction.save()
    return transaction


@transaction.atomic
def user1_give_money_user2_training(user1, user2, amount):
    user1.money -= amount
    user1.save()
    user2.money += amount
    user2.save()
    models.TrainingTransaction.objects.create(user=user1, owner=user2, amount=amount)
