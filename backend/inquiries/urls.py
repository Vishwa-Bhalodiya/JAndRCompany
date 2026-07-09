from django.urls import path

from .views import (
    InquiryListCreateAPIView,
    InquiryDetailAPIView
)

urlpatterns = [

    path(
        "",
        InquiryListCreateAPIView.as_view()
    ),

    path(
        "<int:pk>/",
        InquiryDetailAPIView.as_view()
    ),

]