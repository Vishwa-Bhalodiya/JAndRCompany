from django.urls import path

from .views import (
    PropertyList,
    PropertyDetail,
    AmenityListAPIView,
    toggle_featured,
    similar_properties
)

urlpatterns = [

    path("", PropertyList.as_view()),

    path("<int:pk>/", PropertyDetail.as_view()),

    path("<int:pk>/featured/", toggle_featured),

    path("amenities/", AmenityListAPIView.as_view()),

    path("<int:id>/similar/", similar_properties),

]