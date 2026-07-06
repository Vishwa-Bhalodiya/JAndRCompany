from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Property,
    Amenity,
    PropertyImage,
    PropertyDocument,
)

from .serializers import (
    PropertySerializer,
    AmenitySerializer,
)


class PropertyList(APIView):

    def get(self, request):

        properties = Property.objects.all().order_by("-created_at")

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

            property_instance = serializer.save()

            # Save Images
            images = request.FILES.getlist("images")

            for image in images:
                PropertyImage.objects.create(
                    property=property_instance,
                    image=image,
                )

            # Save Documents
            documents = request.FILES.getlist("documents")

            for document in documents:
                PropertyDocument.objects.create(
                    property=property_instance,
                    document=document,
                )

            return Response(
                PropertySerializer(
                    property_instance,
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


class AmenityListAPIView(ListAPIView):

    queryset = Amenity.objects.all()

    serializer_class = AmenitySerializer


@api_view(["PATCH"])
def toggle_featured(request, pk):

    property_instance = get_object_or_404(Property, pk=pk)

    property_instance.featured = not property_instance.featured

    property_instance.save()

    return Response(
        {
            "success": True,
            "featured": property_instance.featured,
        }
    )



from django.db.models import Q

@api_view(['GET'])
def similar_properties(request, id):
    try:
        property_obj = Property.objects.get(id=id)

        similar = Property.objects.filter(
            Q(property_type__iexact=property_obj.property_type) &
            Q(location__icontains=property_obj.location) &
            Q(status=property_obj.status)
        ).exclude(id=id)

        similar = similar[:6]

        serializer = PropertySerializer(similar, many=True)
        return Response(serializer.data)

    except Property.DoesNotExist:
        return Response({"error": "Property not found"}, status=404)