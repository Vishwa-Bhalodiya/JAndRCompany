import json

from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from users.permissions import IsAdminRole

from .models import (
    Property,
    Amenity,
    PropertyImage,
    PropertyDocument,
)

from .serializers import (
    PropertySerializer,
    AmenitySerializer,
    PropertyDocumentSerializer,
)


def _parse_boundary_points(raw):
    """Accepts either a JSON-encoded string (multipart forms) or an
    already-decoded list (JSON requests). Returns None if absent/invalid
    so callers can tell "not provided" apart from "clear it"."""
    if raw is None:
        return None
    parsed = raw
    if isinstance(raw, str):
        try:
            parsed = json.loads(raw)
        except (TypeError, ValueError):
            return None
    if not isinstance(parsed, list):
        return None
    return parsed


def _explicit_bool(raw):
    """Returns True/False only when raw unambiguously represents one
    (native bool from JSON, or "true"/"false" string from a form field);
    None otherwise, so callers can tell "not provided" apart from a value."""
    if isinstance(raw, bool):
        return raw
    if isinstance(raw, str):
        if raw.lower() in ("true", "1"):
            return True
        if raw.lower() in ("false", "0"):
            return False
    return None


class PropertyList(APIView):

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminRole()]
        return [AllowAny()]

    def get(self, request):

        show_all = request.query_params.get("all") == "true"

        if show_all:
            if not IsAdminRole().has_permission(request, self):
                return Response(
                    {"detail": "Admin access required."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            properties = Property.objects.all().order_by("-created_at")
        else:
            properties = Property.objects.filter(is_approved=True).order_by("-created_at")

        serializer = PropertySerializer(
            properties,
            many=True,
            context={"request": request},
        )

        return Response(serializer.data)

    def post(self, request):

        print("REQUEST DATA:", request.data)
        print("AMENITY IDS:", request.data.getlist("amenity_ids"))

        serializer = PropertySerializer(data=request.data)

        print("VALID:", serializer.is_valid())
        print("ERRORS:", serializer.errors)

        if serializer.is_valid():

            print("VALIDATED DATA:", serializer.validated_data)

            Property_instance = serializer.save()

            boundary_points = _parse_boundary_points(request.data.get("boundary_points"))
            if boundary_points is not None:
                Property_instance.boundary_points = boundary_points
                Property_instance.save(update_fields=["boundary_points"])

            # Save Images
            images = request.FILES.getlist("images")

            for image in images:
                PropertyImage.objects.create(
                    Property=Property_instance,
                    image=image,
                )

            # Save Documents
            documents = request.FILES.getlist("documents")

            for document in documents:
                PropertyDocument.objects.create(
                    Property=Property_instance,
                    document=document,
                )

            return Response(
                PropertySerializer(
                    Property_instance,
                    context={"request": request},
                ).data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class PropertyDetail(RetrieveUpdateDestroyAPIView):

    queryset = Property.objects.all()

    serializer_class = PropertySerializer

    def get_permissions(self):
        if self.request.method in ("PUT", "PATCH", "DELETE"):
            return [IsAdminRole()]
        return [AllowAny()]

    def perform_update(self, serializer):
        explicit_is_approved = _explicit_bool(self.request.data.get("is_approved"))
        if explicit_is_approved is not None:
            instance = serializer.save(is_approved=explicit_is_approved)
        else:
            instance = serializer.save()

        boundary_points = _parse_boundary_points(self.request.data.get("boundary_points"))
        if boundary_points is not None:
            instance.boundary_points = boundary_points
            instance.save(update_fields=["boundary_points"])


class AmenityListAPIView(ListAPIView):

    queryset = Amenity.objects.all()

    serializer_class = AmenitySerializer


@api_view(["PATCH"])
def toggle_featured(request, pk):

    Property_instance = get_object_or_404(Property, pk=pk)

    Property_instance.featured = not Property_instance.featured

    Property_instance.save()

    return Response(
        {
            "success": True,
            "featured": Property_instance.featured,
        }
    )



from django.db.models import Q

@api_view(['GET'])
def similar_properties(request, id):
    try:
        Property_obj = Property.objects.get(id=id)

        similar = Property.objects.filter(
            Q(Property_type__iexact=Property_obj.Property_type) &
            Q(location__icontains=Property_obj.location) &
            Q(status=Property_obj.status) &
            Q(is_approved=True)
        ).exclude(id=id)

        similar = similar[:6]

        serializer = PropertySerializer(similar, many=True)
        return Response(serializer.data)

    except Property.DoesNotExist:
        return Response({"error": "Property not found"}, status=404)


class PropertyDocumentViewSet(viewsets.ModelViewSet):
    """Admin-only document verification workflow. Documents are uploaded via
    PropertyList.post(); this viewset is only for reviewing/verifying/rejecting them."""

    queryset = PropertyDocument.objects.select_related("Property", "verified_by").order_by("-uploaded_at")
    serializer_class = PropertyDocumentSerializer
    permission_classes = [IsAdminRole]

    def perform_update(self, serializer):
        status_changed = "status" in serializer.validated_data
        if status_changed:
            serializer.save(verified_by=self.request.user, verified_at=timezone.now())
        else:
            serializer.save()