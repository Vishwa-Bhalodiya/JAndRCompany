from django.urls import path
from .views import FavoriteListAPIView, ToggleFavoriteAPIView

urlpatterns = [
    path("", FavoriteListAPIView.as_view()),
    path("<int:Property_id>/", ToggleFavoriteAPIView.as_view()),
]