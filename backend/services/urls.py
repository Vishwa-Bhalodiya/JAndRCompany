from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BuyRentServiceViewSet,
    SellServiceViewSet,
    MeasurementServiceViewSet,
    LegalCourtServiceViewSet,
    NAServiceViewSet,
    InvestmentServiceViewSet,
    PropertyAlertServiceViewSet,
    LandDocumentationServiceViewSet,
    GovernmentLandServiceViewSet
)

router = DefaultRouter()
router.register(r'buy-rent', BuyRentServiceViewSet, basename='buy-rent')
router.register(r'sell', SellServiceViewSet, basename='sell')
router.register(r'measurement', MeasurementServiceViewSet, basename='measurement')
router.register(r'legal-court', LegalCourtServiceViewSet, basename='legal-court')
router.register(r'na-service', NAServiceViewSet, basename='na-service')
router.register(r'investment', InvestmentServiceViewSet, basename='investment')
router.register(r'property-alert', PropertyAlertServiceViewSet, basename='property-alert')
router.register(r'land-documentation', LandDocumentationServiceViewSet, basename='land-documentation')
router.register(r'government-land', GovernmentLandServiceViewSet, basename='government-land')

urlpatterns = [
    path('', include(router.urls)),
]
