from django.contrib import admin
from moderator.models import Application, ApplicationImage


# Register your models here.
@admin.register(Application)
class AdminApplication(admin.ModelAdmin):
    model = Application
    list_display = ['id', 'owner', 'date', 'description', 'trainer', 'dietician', 'status', 'file']


@admin.register(ApplicationImage)
class AdminApplicationImage(admin.ModelAdmin):
    model = ApplicationImage
    list_display = ['id', 'owner', 'file', 'application']
