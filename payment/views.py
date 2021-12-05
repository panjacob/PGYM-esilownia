from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from payment import utilis
from payment import models
from payment import serializers
from django.conf import settings
import stripe
stripe.api_key = settings.STRIPE_SECRET_KEY


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


@api_view(['POST'])
def stripepk(request):
    stripepk = {'stripepk': settings.STRIPE_PUBLISHABLE_KEY}
    return JsonResponse(stripepk, safe=False)


@api_view(['POST'])
def create_checkout_session(request):
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': request.data['stripeprice'],
                    'quantity': 1,
                },
            ],
            customer_email=request.data['userEmail'],
            mode='payment',
            success_url='https://pgym.xyz/',
            cancel_url='https://pgym.xyz/',
        )
    except Exception as e:
        print(e)
        return Response(status=400)

    return JsonResponse({'url': checkout_session.url}, safe=False)
