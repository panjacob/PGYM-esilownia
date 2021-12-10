from rest_framework.serializers import ModelSerializer
from payment.models import Transaction, Offer, TrainingTransaction


class TransactionSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['transaction_id', 'time', 'payed', 'purchased']


class OfferSerializer(ModelSerializer):
    class Meta:
        model = Offer
        fields = ['id', 'stripe_price_id', 'name', 'price', 'coins']


class TrainingTransactionSerializer(ModelSerializer):
    class Meta:
        model = TrainingTransaction
        fields = ['transaction_id', 'time', 'user', 'owner', 'amount']
