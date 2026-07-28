from rest_framework import viewsets
from .models import BuyRentService, SellService, MeasurementService, LegalCourtService, NAService, InvestmentService
from .serializers import (
    BuyRentServiceSerializer,
    SellServiceSerializer,
    MeasurementServiceSerializer,
    LegalCourtServiceSerializer,
    NAServiceSerializer,
    InvestmentServiceSerializer
)

class BuyRentServiceViewSet(viewsets.ModelViewSet):
    queryset = BuyRentService.objects.all()
    serializer_class = BuyRentServiceSerializer

class SellServiceViewSet(viewsets.ModelViewSet):
    queryset = SellService.objects.all()
    serializer_class = SellServiceSerializer

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
