from django.db import models


class Job(models.Model):
    name = models.CharField(max_length=200, default=None)
    sector = models.ManyToManyField(
        "sectors.Sector",
        related_name="jobs",
        blank=True,
    )
    complete = models.BooleanField(default=False)
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
    deliverables = models.ManyToManyField(
        "jobs.Deliverable",
        related_name="job",
        blank=True,
    )
    milestones = models.ManyToManyField(
        "milestones.Milestone",
        related_name="job",
        blank=True
    )
    assigned_freelancer = models.ManyToManyField(
        "jwt_auth.User",
        related_name="jobs",
        blank=True,
    )

    def __str__(self):
        return self.name


class Deliverable(models.Model):
    name = models.CharField(max_length=200, default=None)

    def __str__(self):
        return self.name
