from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from training.models import TrainingGroup, TrainingGroupType, Files, Training
from users.models import UserExtended


class TrainingGroupTypesSerializer(ModelSerializer):
    class Meta:
        model = TrainingGroupType
        fields = ['id', 'type', 'description']


class FilesSerializer(ModelSerializer):
    class Meta:
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

        fields = ['id', 'owner', 'date', 'difficulty', 'title', 'description', 'type', 'participants']


class TrainingSerializerCreate(ModelSerializer):
    class Meta:
        model = Training
        training_group = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['id', 'training_group', 'title', 'description', 'date_start', 'date_end', 'calories']
