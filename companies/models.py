from django.db import models

# Create your models here.


class Company(models.Model):
    name = models.CharField(max_length=200, default=None)
    sector = models.ManyToManyField(
        "sectors.Sector",
        related_name="company",
        blank=True,
    )
    description = models.TextField(max_length=500, default=None)
    logo = models.TextField(max_length=500, default=None)
    website = models.CharField(max_length=200, default=None)
    country = models.CharField(max_length=200, default=None)

    def __str__(self):
        return self.name
