from rest_framework.serializers import ModelSerializer
from payment.models import Transaction, Offer


class TransactionSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['transaction_id', 'time', 'payed', 'purchased']


class OfferSerializer(ModelSerializer):
    class Meta:
        model = Offer
        fields = ['id', 'name', 'price', 'coins']
