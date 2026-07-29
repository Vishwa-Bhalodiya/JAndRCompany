from rest_framework import serializers
from .models import BuyRentService, SellService, MeasurementService, LegalCourtService, NAService, InvestmentService

class BuyRentServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyRentService
        fields = '__all__'

class SellServiceSerializer(serializers.ModelSerializer):
    survey_no = serializers.CharField(required=False, allow_blank=True, default="")
    building_name = serializers.CharField(required=False, allow_blank=True, default="")

    class Meta:
        model = SellService
        fields = '__all__'

    def validate(self, data):
        survey_no = data.get('survey_no', '').strip()
        building_name = data.get('building_name', '').strip()
        if not survey_no and not building_name:
            raise serializers.ValidationError("Please provide either a Survey No. or a Building Name.")
        return data

class MeasurementServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeasurementService
        fields = '__all__'

class LegalCourtServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalCourtService
        fields = '__all__'

class NAServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = NAService
        fields = '__all__'

class InvestmentServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvestmentService
        fields = '__all__'
