from rest_framework import serializers

from .models import (
    Property,
    Amenity,
    PropertyImage,
    PropertyDocument,
)


class AmenitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Amenity
        fields = "__all__"


class PropertyImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = PropertyImage
        fields = "__all__"


class PropertyDocumentSerializer(serializers.ModelSerializer):

    property_title = serializers.CharField(source="Property.title", read_only=True)
    verified_by_username = serializers.CharField(source="verified_by.username", read_only=True, default=None)

    class Meta:
        model = PropertyDocument
        fields = "__all__"
        read_only_fields = ["verified_by", "verified_at"]


class PropertySerializer(serializers.ModelSerializer):

    # Read
    amenities = AmenitySerializer(
        many=True,
        read_only=True
    )

    # Write
    amenity_ids = serializers.PrimaryKeyRelatedField(
        queryset=Amenity.objects.all(),
        many=True,
        write_only=True,
        required=False
    )

    images = PropertyImageSerializer(
        many=True,
        read_only=True
    )

    documents = PropertyDocumentSerializer(
        many=True,
        read_only=True
    )

    # Written manually in the view (from a JSON-encoded form field), not
    # through normal serializer validation, since it arrives as a plain
    # string inside multipart/form-data requests.
    boundary_points = serializers.JSONField(read_only=True)

    # DRF treats a BooleanField omitted from multipart/form-data as an
    # explicit False (HTML checkbox semantics), which would silently
    # unpublish every property saved through the FormData-based admin
    # forms. Handled manually in the view instead, where it's only
    # touched when a caller (e.g. the Publish button) explicitly sends it.
    is_approved = serializers.BooleanField(read_only=True)

    class Meta:
        model = Property

        fields = [
            "id",
            "title",
            "description",
            "price",
            "location",
            "survey_no",
            "Property_type",
            "status",
            "area",
            "google_map",
            "latitude",
            "longitude",
            "boundary_points",
            "featured",
            "is_approved",
            "amenities",
            "amenity_ids",
            "images",
            "documents",
            "created_at",
        ]

    def create(self, validated_data):

        amenity_ids = validated_data.pop("amenity_ids", [])

        Property_instance = Property.objects.create(**validated_data)

        Property_instance.amenities.set(amenity_ids)

        return Property_instance

    def update(self, instance, validated_data):

        amenity_ids = validated_data.pop("amenity_ids", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        if amenity_ids is not None:
            instance.amenities.set(amenity_ids)

        return instance

    def to_representation(self, instance):

        data = super().to_representation(instance)

        data["amenities"] = AmenitySerializer(
            instance.amenities.all(),
            many=True
        ).data

        return data