from django.db import models


class Milestone(models.Model):
    name = models.CharField(max_length=200, default=None)
    due_date = models.DateTimeField(default=None)
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['due_date', 'pk']

    def __str__(self):
        return self.name
