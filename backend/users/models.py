from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("buyer", "Buyer"),
    )

    email = models.EmailField(unique=True)

    # IMPORTANT: default MUST be buyer
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default="buyer"
    )

    def __str__(self):
        return f"{self.username} ({self.role})"