from django.db import models

class BuyRentService(models.Model):
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    survey_no = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    village_name = models.CharField(max_length=255)
    district_name = models.CharField(max_length=255)
    taluka_name = models.CharField(max_length=255)
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
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Sell"

class MeasurementService(models.Model):
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    survey_no = models.CharField(max_length=100)
    village = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    taluka = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Measurement"

class LegalCourtService(models.Model):
    name = models.CharField(max_length=255)
    mobile_no = models.CharField(max_length=20)
    survey_no = models.CharField(max_length=100)
    village = models.CharField(max_length=255)
    taluka = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    problem_description = models.TextField()
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
