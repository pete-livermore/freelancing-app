from django.db import models
from django.core.validators import MaxValueValidator


class Review(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.PositiveSmallIntegerField(
        validators=[MaxValueValidator(10)])
    user = models.ForeignKey(
        "jwt_auth.User",
        related_name="received_reviews",
        on_delete=models.CASCADE,
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="given_reviews",
        on_delete=models.CASCADE
    )
