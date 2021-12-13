from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from diet.models import DietGroup, DietGroupType


class DietGroupTypesSerializer(ModelSerializer):
    class Meta:
        model = DietGroupType
        fields = ['id', 'type']


class DietGroupSerializerCreate(ModelSerializer):
    class Meta:
        model = DietGroup
        optional_fields = ['image', 'is_private']
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        type = DietGroupTypesSerializer(read_only=True, many=True)

        fields = ['owner', 'title', 'description', 'type', 'price_day', 'price_week', 'price_month', 'image',
                  'is_private']
