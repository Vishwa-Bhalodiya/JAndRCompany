from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ChatSessionViewSet, SendMessageView

router = DefaultRouter()
router.register(r"sessions", ChatSessionViewSet, basename="chat-session")

urlpatterns = [
    path("send/", SendMessageView.as_view(), name="chat-send"),
    path("", include(router.urls)),
]
