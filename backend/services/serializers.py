from rest_framework import serializers
from .models import BuyRentService, SellService, MeasurementService, LegalCourtService, NAService, InvestmentService

class BuyRentServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyRentService
        fields = '__all__'

class SellServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellService
        fields = '__all__'

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
