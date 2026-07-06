from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import SavedProperty
from .serializers import SavedPropertySerializer
from properties.models import Property


class FavoriteListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = SavedProperty.objects.filter(
            user=request.user
        ).select_related("property")

        serializer = SavedPropertySerializer(
            favorites,
            many=True
        )

        return Response(serializer.data)


class ToggleFavoriteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, property_id):

        try:
            property_obj = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response(
                {"error": "Property not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        favorite = SavedProperty.objects.filter(
            user=request.user,
            property=property_obj
        ).first()

        if favorite:
            favorite.delete()

            return Response({
                "success": True,
                "favorited": False,
                "message": "Removed from favorites"
            })

        SavedProperty.objects.create(
            user=request.user,
            property=property_obj
        )

        return Response({
            "success": True,
            "favorited": True,
            "message": "Added to favorites"
        })