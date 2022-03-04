from django.db import models

# Create your models here.


class Job(models.Model):
    name = models.CharField(max_length=200, default=None)
    category = models.CharField(max_length=200, default=None)
    brief = models.TextField(max_length=500, default=None)
    date_listed = models.DateTimeField(auto_now_add=True)
    completion_date = models.DateTimeField(default=None)
    pay = models.PositiveIntegerField(default=None)
    owner = models.ForeignKey(
        "jwt_auth.User", related_name="created_jobs", on_delete=models.CASCADE, default=None
    )
    # worker = models.ForeignKey(
    #     "jwt_auth.User", related_name="jobs", on_delete=models.CASCADE
    # )

    def __str__(self):
        return self.name


class Deliverable(models.Model):
    name = models.CharField(max_length=200, default=None)
    job = models.ForeignKey(
        "jobs.Job",
        related_name="deliverables",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class Milestone(models.Model):
    name = models.CharField(max_length=200, default=None)
    due_date = models.DateTimeField(default=None)
    job = models.ForeignKey(
        "jobs.Job",
        related_name="milestones",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name
