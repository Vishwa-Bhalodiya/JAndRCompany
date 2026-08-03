from rest_framework import serializers
from .models import BuyRentService, SellService, MeasurementService, LegalCourtService, NAService, InvestmentService, PropertyAlertService, LandDocumentationService, GovernmentLandService, LandFinanceService

class SurveyOrBuildingSerializer(serializers.ModelSerializer):
    survey_no = serializers.CharField(required=False, allow_blank=True, default="")
    building_name = serializers.CharField(required=False, allow_blank=True, default="")

    def validate(self, data):
        survey_no = data.get('survey_no', '').strip()
        building_name = data.get('building_name', '').strip()
        if not survey_no and not building_name:
            raise serializers.ValidationError("Please provide either a Survey No. or a Building Name.")
        return data

class BuyRentServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyRentService
        fields = '__all__'

class SellServiceSerializer(SurveyOrBuildingSerializer):
    price = serializers.DecimalField(max_digits=12, decimal_places=2, required=True)
    area = serializers.IntegerField(required=True)

    class Meta:
        model = SellService
        fields = '__all__'
        read_only_fields = ['property']

class MeasurementServiceSerializer(SurveyOrBuildingSerializer):
    class Meta:
        model = MeasurementService
        fields = '__all__'

class LegalCourtServiceSerializer(SurveyOrBuildingSerializer):
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

class PropertyAlertServiceSerializer(SurveyOrBuildingSerializer):
    class Meta:
        model = PropertyAlertService
        fields = '__all__'

class LandDocumentationServiceSerializer(SurveyOrBuildingSerializer):
    class Meta:
        model = LandDocumentationService
        fields = '__all__'

class GovernmentLandServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = GovernmentLandService
        fields = '__all__'

class LandFinanceServiceSerializer(SurveyOrBuildingSerializer):
    class Meta:
        model = LandFinanceService
        fields = '__all__'
