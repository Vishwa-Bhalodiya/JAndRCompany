from rest_framework import serializers

from .models import (
    Property,
    Amenity,
    PropertyImage,
    PropertyDocument
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

    class Meta:
        model = PropertyDocument
        fields = "__all__"


class PropertySerializer(serializers.ModelSerializer):

    amenities = serializers.PrimaryKeyRelatedField(
        queryset=Amenity.objects.all(),
        many=True,
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

    class Meta:
        model = Property

        fields = [
            "id",
            "title",
            "description",
            "price",
            "location",
            "property_type",
            "status",
            "area",
            "google_map",
            "featured",
            "amenities",
            "images",
            "documents",
            "created_at"
        ]

    def create(self, validated_data):

        amenities = validated_data.pop("amenities", [])

        property_instance = Property.objects.create(**validated_data)

        property_instance.amenities.set(amenities)

        return property_instance

    def update(self, instance, validated_data):

        amenities = validated_data.pop("amenities", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        if amenities is not None:
            instance.amenities.set(amenities)

        return instance