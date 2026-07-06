from rest_framework.response import Response
from rest_framework.views import APIView

from properties.models import Property
from properties.serializers import PropertySerializer


class HomeAPIView(APIView):

    def get(self, request):

        featured = Property.objects.filter(featured=True)[:6]

        featured_properties = PropertySerializer(
            featured,
            many=True,
            context={"request": request}
        ).data

        data = {
            "hero": {
                "title": "Find Your Dream Property",
                "subtitle": "Trusted Real Estate",
                "description": "Buy, sell and invest with J & R Company."
            },

            "featured_properties": featured_properties,

            "stats": {
                "total_properties": Property.objects.count(),
                "for_sale": Property.objects.filter(status="For Sale").count(),
                "for_rent": Property.objects.filter(status="For Rent").count(),
                "sold": Property.objects.filter(status="Sold").count(),
            },

            "locations": list(
                Property.objects.values_list(
                    "location",
                    flat=True
                ).distinct()
            ),

            "property_types": list(
                Property.objects.values_list(
                    "property_type",
                    flat=True
                ).distinct()
            )
        }

        return Response(data)