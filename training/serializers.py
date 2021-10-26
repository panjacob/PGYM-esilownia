from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from training.models import TrainingGroup, TrainingGroupTypes, Files
from users.models import UserExtended


class TrainingGroupTypesSerializer(ModelSerializer):
    model = TrainingGroupTypes
    fields = ['id']


class FilesSerializer(ModelSerializer):
    model = Files
    training_group = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    fields = ['my_file', 'owner', 'training_group']


class TrainingGroupSerializerCreate(ModelSerializer):
    class Meta:
        model = TrainingGroup
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        type = TrainingGroupTypesSerializer(read_only=True, many=True)

        fields = ['owner', 'date', 'difficulty', 'title', 'description', 'type']


class ParticipantsSerializerGet(ModelSerializer):
    class Meta:
        model = UserExtended
        fields = ['id', 'username', 'first_name', 'last_name']


class TrainingGroupSerializerGet(ModelSerializer):
    class Meta:
        model = TrainingGroup
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        type = TrainingGroupTypesSerializer(read_only=True, many=True)
        participants = ParticipantsSerializerGet(read_only=True, many=True)

        fields = ['owner', 'date', 'difficulty', 'title', 'description', 'type', 'participants']
