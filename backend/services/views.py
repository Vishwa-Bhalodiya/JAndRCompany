from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from properties.models import Property, PropertyImage, PropertyDocument
from properties.views import _parse_boundary_points
from users.permissions import IsAdminRole
from .models import BuyRentService, SellService, MeasurementService, LegalCourtService, NAService, InvestmentService, PropertyAlertService, LandDocumentationService, GovernmentLandService, LandFinanceService
from .serializers import (
    BuyRentServiceSerializer,
    SellServiceSerializer,
    MeasurementServiceSerializer,
    LegalCourtServiceSerializer,
    NAServiceSerializer,
    InvestmentServiceSerializer,
    PropertyAlertServiceSerializer,
    LandDocumentationServiceSerializer,
    GovernmentLandServiceSerializer,
    LandFinanceServiceSerializer
)


class PublicCreateAdminManageMixin:
    """Anyone can submit an inquiry (create); only admins can list/view/edit/delete them."""

    def get_permissions(self):
        if self.action in ("create", "track"):
            return [AllowAny()]
        return [IsAdminRole()]


class BuyRentServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = BuyRentService.objects.all()
    serializer_class = BuyRentServiceSerializer

class SellServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = SellService.objects.all()
    serializer_class = SellServiceSerializer

    # SellService.property_type (Land/Home/Shop/Plot) uses a different vocabulary
    # than Property.Property_type (Residential/Commercial/Agricultural/Industrial).
    SELL_TO_PROPERTY_TYPE = {
        "Land": "Agricultural",
        "Home": "Residential",
        "Shop": "Commercial",
        "Plot": "Residential",
    }

    def perform_create(self, serializer):
        sell_service = serializer.save()
        status_val = "For Sale" if sell_service.buy_rent == "Buy" else "For Rent"
        building_part = f" - {sell_service.building_name}" if sell_service.building_name else ""
        title_val = f"{sell_service.property_type} at {sell_service.location}{building_part}"

        # Sellers may optionally pin their property's location and trace its
        # boundary directly on the form; admins can still adjust both later
        # during verification.
        latitude = None
        longitude = None
        lat_raw = self.request.data.get("latitude")
        lng_raw = self.request.data.get("longitude")
        if lat_raw not in (None, "") and lng_raw not in (None, ""):
            try:
                latitude = round(float(lat_raw), 6)
                longitude = round(float(lng_raw), 6)
            except (TypeError, ValueError):
                latitude = None
                longitude = None

        boundary_points = _parse_boundary_points(self.request.data.get("boundary_points")) or []

        property_instance = Property.objects.create(
            title=title_val,
            description=f"Survey No: {sell_service.survey_no}, Village: {sell_service.village_name}, Taluka: {sell_service.taluka}, District: {sell_service.district}, Building: {sell_service.building_name}. Contact: {sell_service.name} ({sell_service.mobile_no})",
            price=sell_service.price,
            location=sell_service.location,
            survey_no=sell_service.survey_no,
            Property_type=self.SELL_TO_PROPERTY_TYPE.get(sell_service.property_type, "Residential"),
            status=status_val,
            area=sell_service.area,
            latitude=latitude,
            longitude=longitude,
            boundary_points=boundary_points,
            is_approved=False,
        )

        for image in self.request.FILES.getlist("images"):
            PropertyImage.objects.create(Property=property_instance, image=image)

        for document in self.request.FILES.getlist("documents"):
            PropertyDocument.objects.create(Property=property_instance, document=document)

        sell_service.property = property_instance
        sell_service.save(update_fields=["property"])

    @action(detail=False, methods=["get"], url_path="track")
    def track(self, request):
        ref_id = request.query_params.get("id")
        mobile_no = request.query_params.get("mobile_no")

        if not ref_id or not mobile_no:
            return Response(
                {"detail": "Both id and mobile_no are required."},
                status=400,
            )

        sell_service = SellService.objects.filter(id=ref_id, mobile_no=mobile_no).first()
        if not sell_service:
            return Response(
                {"detail": "No matching submission found. Check your reference ID and mobile number."},
                status=404,
            )

        property_instance = sell_service.property
        documents = []
        is_published = False

        if property_instance:
            is_published = property_instance.is_approved
            documents = [
                {
                    "id": doc.id,
                    "status": doc.status,
                    "rejection_reason": doc.rejection_reason,
                    "uploaded_at": doc.uploaded_at,
                }
                for doc in property_instance.documents.all()
            ]

        return Response({
            "id": sell_service.id,
            "name": sell_service.name,
            "submitted_at": sell_service.created_at,
            "property_id": property_instance.id if property_instance else None,
            "property_title": property_instance.title if property_instance else None,
            "has_location": bool(property_instance and property_instance.latitude and property_instance.longitude) if property_instance else False,
            "is_published": is_published,
            "documents": documents,
        })

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

    def perform_update(self, serializer):
        instance = serializer.save()

        result_document = self.request.FILES.get("result_document")
        if result_document:
            instance.result_document = result_document
            instance.save(update_fields=["result_document"])

    @action(detail=False, methods=["get"], url_path="track")
    def track(self, request):
        ref_id = request.query_params.get("id")
        mobile_no = request.query_params.get("mobile_no")

        if not ref_id or not mobile_no:
            return Response(
                {"detail": "Both id and mobile_no are required."},
                status=400,
            )

        inquiry = LandDocumentationService.objects.filter(id=ref_id, mobile_no=mobile_no).first()
        if not inquiry:
            return Response(
                {"detail": "No matching submission found. Check your reference ID and mobile number."},
                status=404,
            )

        return Response({
            "id": inquiry.id,
            "name": inquiry.name,
            "submitted_at": inquiry.created_at,
            "has_document": bool(inquiry.result_document),
            "document_url": request.build_absolute_uri(inquiry.result_document.url) if inquiry.result_document else None,
        })

class GovernmentLandServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = GovernmentLandService.objects.all()
    serializer_class = GovernmentLandServiceSerializer

class LandFinanceServiceViewSet(PublicCreateAdminManageMixin, viewsets.ModelViewSet):
    queryset = LandFinanceService.objects.all()
    serializer_class = LandFinanceServiceSerializer
