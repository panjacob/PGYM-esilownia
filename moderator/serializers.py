from rest_framework.serializers import ModelSerializer

from moderator.models import Application, Report


class ApplicationCreateSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = ['owner', 'description', 'trainer', 'dietician', 'file']


class ApplicationGetSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'date', 'owner', 'description', 'status', 'trainer', 'dietician', 'file']


class ReportCreateSerializer(ModelSerializer):
    class Meta:
        model = Report
        optional_fields = ['user_reported', 'file']
        fields = ['owner', 'user_reported', 'title', 'description', 'file']


class ReportGetSerializer(ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'date', 'owner', 'user_reported', 'title', 'description', 'file', 'is_solved']

class ReportEditSerializer(ModelSerializer):
    class Meta:
        model = Report
        fields = ['is_solved']