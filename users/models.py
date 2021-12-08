from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone


class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, username, first_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff = True')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser = True')

        return self.create_user(email, username, first_name, password, **other_fields)

    def create_user(self, username, email="fb", first_name="", password="", **other_fields):
        # print(email)
        # if not email:
        #     raise ValueError('You must provide an email address')
        print('other fields: ', other_fields)
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class UserExtended(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email_address', unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    bank_account = models.IntegerField(default=None, null=True, blank=True)
    ban_date_expiration = models.DateTimeField(default=None, null=True, blank=True)

    # Properties of ContentCreator
    is_coach = models.BooleanField(default=False)
    is_dietician = models.BooleanField(default=False)

    is_moderator = models.BooleanField(default=False)
    profile_photo = models.ImageField(null=True, blank=True)

    money = models.IntegerField(default=1000)
    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', ]

<<<<<<< HEAD
    stripe_customer_id = models.CharField(max_length=150, blank=True)

    # password is required by default ?
=======
    stripe_customer_id = models.CharField(max_length=150, null=True, blank=True)
>>>>>>> backend

    def __str__(self):
        return self.username

