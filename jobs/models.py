from django.db import models

# Create your models here.


class Job(models.Model):
    name = models.CharField(max_length=200, default=None)
    sector = models.CharField(max_length=200, default=None)
    brief = models.TextField(max_length=500, default=None)
    date_listed = models.DateTimeField(auto_now_add=True)
    completion_date = models.DateTimeField(default=None)
    pay = models.PositiveIntegerField(default=None)
    owner = models.ForeignKey(
        "jwt_auth.User", related_name="created_jobs", on_delete=models.CASCADE, default=None
    )
    company = models.ForeignKey(
        "companies.Company", related_name="posted_jobs", on_delete=models.CASCADE, blank=True, null=True
    )
    # worker = models.ForeignKey(
    #     "jwt_auth.User", related_name="jobs", on_delete=models.CASCADE
    # )
    deliverables = models.ForeignKey(
        "jobs.Deliverable",
        related_name="job",
        on_delete=models.CASCADE,
    )
    milestones = models.ForeignKey(
        "jobs.Milestone",
        related_name="job",
        on_delete=models.CASCADE,
    )
    assigned_freelancer = models.ForeignKey(
        "jwt_auth.User",
        related_name="jobs",
        on_delete=models.CASCADE,
        blank=True,
        default=None
    )

    def __str__(self):
        return self.name


class Deliverable(models.Model):
    name = models.CharField(max_length=200, default=None)

    def __str__(self):
        return self.name


class Milestone(models.Model):
    name = models.CharField(max_length=200, default=None)
    due_date = models.DateTimeField(default=None)

    def __str__(self):
        return self.name
