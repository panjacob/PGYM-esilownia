from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from training.models import TrainingGroup, TrainingGroupType, Training, TrainingGroupImage, TrainingGroupVideo


class TrainingGroupTypesSerializer(ModelSerializer):
    class Meta:
        model = TrainingGroupType
        fields = ['id', 'type', 'description']


class TrainingGroupSerializerImageAdd(ModelSerializer):
    class Meta:
        model = TrainingGroupImage
        training_group = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['image', 'owner', 'training_group']


class TrainingGroupSerializerVideoAdd(ModelSerializer):
    class Meta:
        model = TrainingGroupVideo
        training_group = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['video', 'owner', 'training_group']


class TrainingGroupSerializerCreate(ModelSerializer):
    class Meta:
        model = TrainingGroup
        optional_fields = ['image', 'is_private']
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        type = TrainingGroupTypesSerializer(read_only=True, many=True)

        fields = ['owner', 'difficulty', 'title', 'description', 'type', 'price_day',
                  'price_week', 'price_month', 'image', 'is_private']


def participantsSerializerGet(participant):
    # participant = TrainingGroupParticipant.objects.get()
    result = {
        'training_group_participant': participant.id,
        'user': participant.user.id,
        'subscription_end': participant.subscription_end
    }
    return result


class TrainingGroupSerializerGet(ModelSerializer):
    class Meta:
        model = TrainingGroup
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        type = TrainingGroupTypesSerializer(read_only=True, many=True)
        # participants = ParticipantsSerializerGet(read_only=True, many=True)

        fields = ['id', 'owner', 'date', 'difficulty', 'title', 'description', 'type', 'price_day',
                  'price_week', 'price_month', 'image', 'is_private']


class TrainingGroupSerializerGetAll(ModelSerializer):
    class Meta:
        model = TrainingGroup
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        type = TrainingGroupTypesSerializer(read_only=True, many=True)
        # participants = ParticipantsSerializerGet(read_only=True, many=True)

        fields = ['id', 'owner', 'difficulty', 'title', 'type', 'image', 'is_private']


class TrainingSerializerCreate(ModelSerializer):
    class Meta:
        model = Training
        training_group = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['id', 'training_group', 'title', 'description', 'date_start', 'date_end', 'calories']


class TrainingSerializerEdit(ModelSerializer):
    class Meta:
        model = Training
        training_group = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['id', 'title', 'description', 'date_start', 'date_end', 'calories']


class TrainingSerializerGet(ModelSerializer):
    class Meta:
        model = Training
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        # participants = ParticipantsSerializerGet(read_only=True, many=True)

        fields = '__all__'


class TrainingSerializerFile(ModelSerializer):
    class Meta:
        model = Training
        fields = ['file']
