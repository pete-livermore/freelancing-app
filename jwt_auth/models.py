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
    business_website = models.CharField(max_length=100, blank=True)
    sector = models.CharField(max_length=100, blank=True)
    about_me = models.TextField(max_length=500, blank=True)
    skills = models.ManyToManyField(
        "jwt_auth.Skill",
        related_name="users",
        blank=True
    )
    experience = models.ForeignKey(
        "jwt_auth.Experience",
        related_name="experience",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )


class Skill(models.Model):
    name = models.CharField(max_length=50, default=None)

    def __str__(self):
        return self.name


class Experience(models.Model):
    job_title = models.CharField(max_length=50, default=None)
    start_year = models.DateField(default=None)
    end_year = models.DateField(default=None)
    company_name = models.ForeignKey(
        "companies.Company",
        related_name="past_employees",
        on_delete=models.CASCADE,
        blank=True
    )

    def __str__(self):
        return self.job_title
