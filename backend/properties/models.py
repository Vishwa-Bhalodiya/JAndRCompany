from django.db import models


class Amenity(models.Model):

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Property(models.Model):

    PROPERTY_TYPES = (
        ("Residential", "Residential"),
        ("Commercial", "Commercial"),
        ("Agricultural", "Agricultural"),
        ("Industrial", "Industrial"),
    )

    STATUS_CHOICES = (
        ("For Sale", "For Sale"),
        ("For Rent", "For Rent"),
        ("Sold", "Sold"),
    )

    title = models.CharField(max_length=255)

    description = models.TextField()

    price = models.DecimalField(max_digits=12, decimal_places=2)

    location = models.CharField(max_length=255)

    property_type = models.CharField(
        max_length=50,
        choices=PROPERTY_TYPES
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="For Sale"
    )

    area = models.IntegerField()

    google_map = models.URLField(
        blank=True,
        null=True
    )

    featured = models.BooleanField(default=False)

    amenities = models.ManyToManyField(
        Amenity,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class PropertyImage(models.Model):

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(
        upload_to="properties/"
    )

    def __str__(self):
        return self.property.title


class PropertyDocument(models.Model):

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="documents"
    )

    document = models.FileField(
        upload_to="property_documents/"
    )

    def __str__(self):
        return self.property.title