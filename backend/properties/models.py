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
# Property
# =========================
class Property(models.Model):

    Property_TYPES = (
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

    Property_type = models.CharField(
        max_length=50,
        choices=Property_TYPES
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="For Sale"
    )

    area = models.IntegerField()

    google_map = models.URLField(max_length=2000, blank=True, null=True)

    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    featured = models.BooleanField(default=False)

    # Properties created directly by admins default to published (True).
    # Properties auto-created from a public Sell Property submission start
    # unpublished until an admin verifies documents, sets a location, and
    # explicitly publishes them.
    is_approved = models.BooleanField(default=True)

    amenities = models.ManyToManyField(Amenity, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    # =========================
    # AUTO SLUG GENERATION
    # =========================
    def save(self, *args, **kwargs):
        if not self.slug:
            original_slug = slugify(self.title)
            slug = original_slug
            counter = 1
            while Property.objects.filter(slug=slug).exists():
                slug = f"{original_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


# =========================
# Property IMAGES
# =========================
class PropertyImage(models.Model):
    Property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(upload_to="properties/")

    def __str__(self):
        return f"{self.Property.title} - Image {self.id}"


# =========================
# Property DOCUMENTS
# =========================
class PropertyDocument(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("verified", "Verified"),
        ("rejected", "Rejected"),
    )

    Property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="documents"
    )

    document = models.FileField(upload_to="Property_documents/")

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    rejection_reason = models.CharField(max_length=255, blank=True, default="")
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="verified_documents"
    )
    verified_at = models.DateTimeField(null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.Property.title} - Document {self.id}"
    



