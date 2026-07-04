from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView

from .models import (
    Property,
    Amenity,
    PropertyImage,
    PropertyDocument
)

from .serializers import (
    PropertySerializer,
    AmenitySerializer
)


class PropertyList(APIView):

    def get(self, request):

        properties = Property.objects.all().order_by("-created_at")

        serializer = PropertySerializer(
            properties,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)


    def post(self, request):

        serializer = PropertySerializer(data=request.data)

        if serializer.is_valid():

            property_instance = serializer.save()

            # Save Images
            images = request.FILES.getlist("images")

            for image in images:

                PropertyImage.objects.create(
                    property=property_instance,
                    image=image
                )

            # Save Documents
            documents = request.FILES.getlist("documents")

            for document in documents:

                PropertyDocument.objects.create(
                    property=property_instance,
                    document=document
                )

            return Response(
                PropertySerializer(
                    property_instance,
                    context={"request": request}
                ).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class PropertyDetail(RetrieveUpdateDestroyAPIView):

    queryset = Property.objects.all()

    serializer_class = PropertySerializer


class AmenityListAPIView(ListAPIView):

    queryset = Amenity.objects.all()

    serializer_class = AmenitySerializer