from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from payment import utilis
from payment import models
from payment import serializers


@api_view(['POST'])
def transaction_create(request):
    transaction = utilis.create_transaction(user=request.user, offer_id=request.data['offer'])

    return Response({'message': f"Transakcja zakończona poprawnie", 'transaction_id': transaction.transaction_id},
                    status=status.HTTP_200_OK)


@api_view(['POST'])
def transaction_all(request):
    transactions = models.Transaction.objects.filter(user=request.user)
    result = []
    for transaction in transactions:
        serializer = serializers.TransactionSerializer(instance=transaction)
        result.append(serializer.data)
    return JsonResponse(result, safe=False)


@api_view(['POST'])
@permission_classes([AllowAny])
def offer_all(request):
    offers = models.Offer.objects.all()
    result = []
    for offer in offers:
        serializer = serializers.OfferSerializer(instance=offer)
        result.append(serializer.data)
    return JsonResponse(result, safe=False)
