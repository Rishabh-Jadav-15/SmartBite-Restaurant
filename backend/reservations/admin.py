from django.contrib import admin
from .models import Reservation

# Register your models here.
# admin.site.register(Reservation)


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = (
        "customer",
        "table",
        "reservation_date",
        "start_time",
        "end_time",
        "party_size",
        "status",
    )
    search_fields = (
        "customer__name",
        "customer__email",
        "table__table_number",
    )
    list_filter = ("reservation_date", "status")
    ordering = ("-reservation_date", "start_time")
    readonly_fields = ("created_at",)