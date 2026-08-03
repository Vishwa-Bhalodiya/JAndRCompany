from rest_framework import generics
from rest_framework.permissions import AllowAny
from users.permissions import IsAdminRole
from .models import Inquiry
from .serializers import InquirySerializer


class InquiryListCreateAPIView(generics.ListCreateAPIView):

    queryset = Inquiry.objects.all()

    serializer_class = InquirySerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [AllowAny()]
        return [IsAdminRole()]


class InquiryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Inquiry.objects.all()

    serializer_class = InquirySerializer

    permission_classes = [IsAdminRole]
