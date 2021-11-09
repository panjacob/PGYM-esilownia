from dashboard.models import AchievementtUser


def create_achievment_user(user, achievment):
    AchievementtUser.objects.get_or_create(owner=user, achievment=achievment)


def remove_achievment_user(user, achievment):
    AchievementtUser.objects.get(owner=user, achievment=achievment).delete()
