from django.db import models


class Sector(models.Model):
    name = models.CharField(max_length=200, default=None)

    def __str__(self):
        return self.name
