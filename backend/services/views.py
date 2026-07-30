from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from properties.models import Property, PropertyImage, PropertyDocument
from users.permissions import IsAdminRole
from .models import BuyRentService, SellService, MeasurementService, LegalCourtService, NAService, InvestmentService, PropertyAlertService, LandDocumentationService, GovernmentLandService
from .serializers import (
    BuyRentServiceSerializer,
    SellServiceSerializer,
    MeasurementServiceSerializer,
    LegalCourtServiceSerializer,
    NAServiceSerializer,
    InvestmentServiceSerializer,
    PropertyAlertServiceSerializer,
    LandDocumentationServiceSerializer,
    GovernmentLandServiceSerializer
)


class PublicCreateAdminManageMixin:
    """Anyone can submit an inquiry (create); only admins can list/view/edit/delete them."""

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [IsAdminRole()]


class BuyRentServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = BuyRentService.objects.all()
    serializer_class = BuyRentServiceSerializer

class SellServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = SellService.objects.all()
    serializer_class = SellServiceSerializer

    def perform_create(self, serializer):
        sell_service = serializer.save()
        status_val = "For Sale" if sell_service.buy_rent == "Buy" else "For Rent"
        building_part = f" - {sell_service.building_name}" if sell_service.building_name else ""
        title_val = f"{sell_service.property_type} at {sell_service.location}{building_part}"

        property_instance = Property.objects.create(
            title=title_val,
            description=f"Survey No: {sell_service.survey_no}, Village: {sell_service.village_name}, Taluka: {sell_service.taluka}, District: {sell_service.district}, Building: {sell_service.building_name}. Contact: {sell_service.name} ({sell_service.mobile_no})",
            price=sell_service.price,
            location=sell_service.location,
            Property_type=sell_service.property_type,
            status=status_val,
            area=sell_service.area,
        )

        for image in self.request.FILES.getlist("images"):
            PropertyImage.objects.create(Property=property_instance, image=image)

        for document in self.request.FILES.getlist("documents"):
            PropertyDocument.objects.create(Property=property_instance, document=document)

class MeasurementServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = MeasurementService.objects.all()
    serializer_class = MeasurementServiceSerializer

class LegalCourtServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = LegalCourtService.objects.all()
    serializer_class = LegalCourtServiceSerializer

class NAServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = NAService.objects.all()
    serializer_class = NAServiceSerializer

class InvestmentServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = InvestmentService.objects.all()
    serializer_class = InvestmentServiceSerializer

class PropertyAlertServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = PropertyAlertService.objects.all()
    serializer_class = PropertyAlertServiceSerializer

class LandDocumentationServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = LandDocumentationService.objects.all()
    serializer_class = LandDocumentationServiceSerializer

class GovernmentLandServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = GovernmentLandService.objects.all()
    serializer_class = GovernmentLandServiceSerializer
