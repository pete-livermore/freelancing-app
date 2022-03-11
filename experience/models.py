from django.db import models


class Experience(models.Model):
    job_title = models.CharField(max_length=50, default=None)
    start_date = models.DateField(default=None)
    end_date = models.DateField(default=None)
    company_name = models.ForeignKey(
        "companies.Company",
        related_name="past_employees",
        on_delete=models.CASCADE,
        blank=True
    )

    def __str__(self):
        return self.job_title
