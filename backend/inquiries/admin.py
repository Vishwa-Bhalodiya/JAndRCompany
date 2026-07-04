from django.contrib import admin
from .models import Inquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "email",
        "phone",
        "subject",
        "contacted",
        "created_at"
    )

    list_filter = (
        "contacted",
    )

    search_fields = (
        "name",
        "email",
        "phone",
    )