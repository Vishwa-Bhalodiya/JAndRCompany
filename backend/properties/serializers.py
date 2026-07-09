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

    class Meta:
        model = PropertyDocument
        fields = "__all__"


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

    class Meta:
        model = Property

        fields = [
            "id",
            "title",
            "description",
            "price",
            "location",
            "Property_type",
            "status",
            "area",
            "google_map",
            "featured",
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