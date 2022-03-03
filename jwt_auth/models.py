from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.CharField(max_length=50, unique=True)
    profile_image = models.TextField(max_length=500, blank=True)
    is_freelancer = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    business_name = models.CharField(max_length=100, blank=True)
    address = models.TextField(max_length=500, blank=True)
