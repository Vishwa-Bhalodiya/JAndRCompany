from django.db import models
from properties.models import Property

class BuyRentService(models.Model):
    BUY_RENT = (
        ('Buy', 'Buy'),
        ('Rent', 'Rent'),
    )
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    buy_rent = models.CharField(max_length=10, choices=BUY_RENT, blank=True, default="")
    survey_no = models.CharField(max_length=100, blank=True, default="")
    building_name = models.CharField(max_length=255, blank=True, default="")
    location = models.CharField(max_length=255, blank=True, default="")
    village_name = models.CharField(max_length=255)
    district_name = models.CharField(max_length=255)
    taluka_name = models.CharField(max_length=255)
    property = models.ForeignKey(
        Property,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="buy_rent_inquiries"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Buy/Rent"

class SellService(models.Model):
    PROPERTY_TYPES = (
        ('Land', 'Land'),
        ('Home', 'Home'),
        ('Shop', 'Shop'),
        ('Plot', 'Plot'),
    )
    BUY_RENT = (
        ('Buy', 'Buy'),
        ('Rent', 'Rent'),
    )
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    survey_no = models.CharField(max_length=100, blank=True, default="")
    location = models.CharField(max_length=255)
    village_name = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    taluka = models.CharField(max_length=255)
    building_name = models.CharField(max_length=255, blank=True, default="")
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
    buy_rent = models.CharField(max_length=10, choices=BUY_RENT)
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    area = models.IntegerField(default=0)
    property = models.ForeignKey(
        Property,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="sell_inquiries"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Sell"

class MeasurementService(models.Model):
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    survey_no = models.CharField(max_length=100, blank=True, default="")
    building_name = models.CharField(max_length=255, blank=True, default="")
    village = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    taluka = models.CharField(max_length=255)
    document = models.FileField(upload_to="measurement_documents/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Measurement"

class LegalCourtService(models.Model):
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    survey_no = models.CharField(max_length=100, blank=True, default="")
    building_name = models.CharField(max_length=255, blank=True, default="")
    village = models.CharField(max_length=255)
    taluka = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    problem_description = models.TextField()
    document = models.FileField(upload_to="legal_court_documents/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Legal & Court"

class NAService(models.Model):
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    survey_no = models.CharField(max_length=100)
    village = models.CharField(max_length=255)
    taluka = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    na_papers = models.CharField(max_length=255) # Assuming text/yes-no for now based on plan
    document = models.FileField(upload_to="na_service_documents/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - N.A."

class InvestmentService(models.Model):
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    district = models.CharField(max_length=255)
    taluka = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Investment"

class PropertyAlertService(models.Model):
    PROPERTY_TYPES = (
        ('Land', 'Land'),
        ('Home', 'Home'),
        ('Shop', 'Shop'),
        ('Plot', 'Plot'),
    )
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
    survey_no = models.CharField(max_length=100, blank=True, default="")
    building_name = models.CharField(max_length=255, blank=True, default="")
    location = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    taluka = models.CharField(max_length=255)
    document = models.FileField(upload_to="property_alert_documents/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Property Alert"

class LandDocumentationService(models.Model):
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    survey_no = models.CharField(max_length=100, blank=True, default="")
    building_name = models.CharField(max_length=255, blank=True, default="")
    village = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    taluka = models.CharField(max_length=255)
    result_document = models.FileField(upload_to="land_documentation_results/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Land Documentation"

class GovernmentLandService(models.Model):
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    survey_no = models.CharField(max_length=100)
    village = models.CharField(max_length=255)
    taluka = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    matter_details = models.CharField(max_length=255)
    document = models.FileField(upload_to="government_land_documents/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Government Land"

class LandFinanceService(models.Model):
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    survey_no = models.CharField(max_length=100, blank=True, default="")
    building_name = models.CharField(max_length=255, blank=True, default="")
    village = models.CharField(max_length=255)
    taluka = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    land_area = models.IntegerField(default=0)
    loan_amount_required = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    purpose = models.CharField(max_length=255, blank=True, default="")
    document = models.FileField(upload_to="land_finance_documents/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Land Against Finance"
