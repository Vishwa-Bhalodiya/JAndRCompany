from django.contrib import admin
from .models import BuyRentService, SellService, MeasurementService, LegalCourtService, NAService, InvestmentService

admin.site.register(BuyRentService)
admin.site.register(SellService)
admin.site.register(MeasurementService)
admin.site.register(LegalCourtService)
admin.site.register(NAService)
admin.site.register(InvestmentService)
