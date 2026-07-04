from django.urls import path

from .views import (
    PropertyList,
    PropertyDetail,
    AmenityListAPIView
)

urlpatterns = [

    path("", PropertyList.as_view()),

    path("<int:pk>/", PropertyDetail.as_view()),

    path("amenities/", AmenityListAPIView.as_view()),

]