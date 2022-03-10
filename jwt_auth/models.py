from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.CharField(max_length=50, unique=True)
    profile_image = models.TextField(max_length=500, blank=True)
    is_freelancer = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    business_name = models.CharField(max_length=100, blank=True)
    address = models.TextField(max_length=500, blank=True)
    city = models.TextField(max_length=100, blank=True)
    country = models.TextField(max_length=100, blank=True)
    postcode = models.TextField(max_length=7, blank=True)
    business_website = models.CharField(max_length=100, blank=True)
    personal_website = models.CharField(max_length=100, blank=True)
    linkedin_url = models.CharField(max_length=100, blank=True)
    job_title = models.CharField(max_length=100, blank=True)
    sector = models.ManyToManyField(
        "sectors.Sector",
        related_name="users",
        blank=True,
    )
    about_me = models.TextField(max_length=500, blank=True)
    skills = models.ManyToManyField(
        "skills.Skill",
        related_name="users",
        blank=True
    )
    experience = models.ManyToManyField(
        "experience.Experience",
        related_name="experience",
        blank=True,
    )
    applied_jobs = models.ManyToManyField(
        "jobs.Job",
        related_name="job_applicants",
        blank=True,
    )
