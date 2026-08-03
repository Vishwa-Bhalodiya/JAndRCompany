from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    PropertyList,
    PropertyDetail,
    AmenityListAPIView,
    toggle_featured,
    similar_properties,
    PropertyDocumentViewSet
)

router = DefaultRouter()
router.register(r"documents", PropertyDocumentViewSet, basename="property-document")

urlpatterns = [

    path("", PropertyList.as_view()),

    path("amenities/", AmenityListAPIView.as_view()),

    path("", include(router.urls)),

    path("<int:pk>/", PropertyDetail.as_view()),

    path("<int:pk>/featured/", toggle_featured),

    path("<int:id>/similar/", similar_properties),

]
