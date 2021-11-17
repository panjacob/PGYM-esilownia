from rest_framework.serializers import ModelSerializer
from payment.models import Transaction


class TransactionSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['transaction_id', 'time', 'payed', 'purchased']
