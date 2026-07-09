from rest_framework import generics
from .models import Inquiry
from .serializers import InquirySerializer


class InquiryListCreateAPIView(generics.ListCreateAPIView):

    queryset = Inquiry.objects.all()

    serializer_class = InquirySerializer


class InquiryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Inquiry.objects.all()

    serializer_class = InquirySerializer