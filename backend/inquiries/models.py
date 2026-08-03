from django.db import models


class Inquiry(models.Model):

    name = models.CharField(max_length=150)

    email = models.EmailField()

    phone = models.CharField(max_length=20)

    subject = models.CharField(max_length=200)

    message = models.TextField()

    contacted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name