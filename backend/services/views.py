from rest_framework import viewsets
from properties.models import Property
from .models import BuyRentService, SellService, MeasurementService, LegalCourtService, NAService, InvestmentService, PropertyAlertService
from .serializers import (
    BuyRentServiceSerializer,
    SellServiceSerializer,
    MeasurementServiceSerializer,
    LegalCourtServiceSerializer,
    NAServiceSerializer,
    InvestmentServiceSerializer,
    PropertyAlertServiceSerializer
)

class BuyRentServiceViewSet(viewsets.ModelViewSet):
    queryset = BuyRentService.objects.all()
    serializer_class = BuyRentServiceSerializer

class SellServiceViewSet(viewsets.ModelViewSet):
    queryset = SellService.objects.all()
    serializer_class = SellServiceSerializer

    def perform_create(self, serializer):
        sell_service = serializer.save()
        status_val = "For Sale" if sell_service.buy_rent == "Buy" else "For Rent"
        building_part = f" - {sell_service.building_name}" if sell_service.building_name else ""
        title_val = f"{sell_service.property_type} at {sell_service.location}{building_part}"
        
        Property.objects.create(
            title=title_val,
            description=f"Survey No: {sell_service.survey_no}, Village: {sell_service.village_name}, Taluka: {sell_service.taluka}, District: {sell_service.district}, Building: {sell_service.building_name}. Contact: {sell_service.name} ({sell_service.mobile_no})",
            price=0.00,
            location=sell_service.location,
            Property_type=sell_service.property_type,
            status=status_val,
            area=0,
        )

class MeasurementServiceViewSet(viewsets.ModelViewSet):
    queryset = MeasurementService.objects.all()
    serializer_class = MeasurementServiceSerializer

class LegalCourtServiceViewSet(viewsets.ModelViewSet):
    queryset = LegalCourtService.objects.all()
    serializer_class = LegalCourtServiceSerializer

class NAServiceViewSet(viewsets.ModelViewSet):
    queryset = NAService.objects.all()
    serializer_class = NAServiceSerializer

class InvestmentServiceViewSet(viewsets.ModelViewSet):
    queryset = InvestmentService.objects.all()
    serializer_class = InvestmentServiceSerializer

class PropertyAlertServiceViewSet(viewsets.ModelViewSet):
    queryset = PropertyAlertService.objects.all()
    serializer_class = PropertyAlertServiceSerializer
