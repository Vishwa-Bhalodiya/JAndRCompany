from django.contrib import admin

from .models import (
    Property,
    Amenity,
    PropertyImage,
    PropertyDocument
)


admin.site.register(Property)
admin.site.register(Amenity)
admin.site.register(PropertyImage)
admin.site.register(PropertyDocument)