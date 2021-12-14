from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from diet.models import Diet, DietType, DietFile


class DietGroupTypesSerializer(ModelSerializer):
    class Meta:
        model = DietType
        fields = ['id', 'type']


class DietGroupSerializerCreate(ModelSerializer):
    class Meta:
        model = Diet
        optional_fields = ['image', 'is_private']
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        type = DietGroupTypesSerializer(read_only=True, many=True)

        fields = ['owner', 'title', 'description', 'type', 'price_day', 'price_week', 'price_month', 'image',
                  'is_private']


class DietGroupSerializerGet(ModelSerializer):
    class Meta:
        model = Diet
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        type = DietGroupTypesSerializer(read_only=True, many=True)

        fields = ['id', 'owner', 'date', 'title', 'description', 'type', 'price_day',
                  'price_week', 'price_month', 'image', 'is_private']


def participantsSerializerGet(participant):
    result = {
        'diet_group_participant': participant.id,
        'user': participant.user.id,
        'subscription_end': participant.subscription_end
    }
    return result


class DietGroupSerializerGetAll(ModelSerializer):
    class Meta:
        model = Diet
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        type = DietGroupTypesSerializer(read_only=True, many=True)

        fields = ['id', 'owner', 'title', 'type', 'image', 'is_private']


class DietGroupFileSerializer(ModelSerializer):
    class Meta:
        model = DietFile
        diet_group = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['file', 'owner', 'diet_group']
