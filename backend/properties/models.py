from django.db import models
from django.conf import settings
from django.utils.text import slugify


# =========================
# AMENITIES
# =========================
class Amenity(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# =========================
# PROPERTY
# =========================
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

    # 🔐 ownership (IMPORTANT FOR SAAS)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="properties",
        null=True,
        blank=True
    )

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)

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

    google_map = models.URLField(max_length=2000, blank=True, null=True)

    featured = models.BooleanField(default=False)

    amenities = models.ManyToManyField(Amenity, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    # =========================
    # AUTO SLUG GENERATION
    # =========================
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


# =========================
# PROPERTY IMAGES
# =========================
class PropertyImage(models.Model):
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(upload_to="properties/")

    def __str__(self):
        return f"{self.property.title} - Image {self.id}"


# =========================
# PROPERTY DOCUMENTS
# =========================
class PropertyDocument(models.Model):
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="documents"
    )

    document = models.FileField(upload_to="property_documents/")

    def __str__(self):
        return f"{self.property.title} - Document {self.id}"