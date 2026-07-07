from rest_framework import serializers
from .models import SavedProperty
from properties.serializers import PropertySerializer


class SavedPropertySerializer(serializers.ModelSerializer):

    Property = PropertySerializer(read_only=True)

    class Meta:
        model = SavedProperty
        fields = "__all__"