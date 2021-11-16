from django.db import transaction
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response

from payment.models import Transaction, Offer


@transaction.atomic
def transaction_create(request):
    user = request.user
    offer_id = request.data['offer']
    offer = Offer.objects.get(id=offer_id)

    transaction = Transaction.objects.create(user=user, payed=offer.price, purchased=offer.coins)
    user.coins += offer.coins
    user.save()
    transaction.save()

    return Response({'message': f"Transakcja zakończona poprawnie", 'transaction_id': transaction.transaction_id},
                    status=status.HTTP_200_OK)
