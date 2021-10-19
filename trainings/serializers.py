from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from trainings.models import TrainingGroup


class TrainingGroupSerializerCreate(ModelSerializer):
    class Meta:
        model = TrainingGroup
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        # type is to add when Type class is finished
        # type = TagSerializer(read_only=True, many=True)

        fields = ['owner', 'difficulty', 'title', 'description']
