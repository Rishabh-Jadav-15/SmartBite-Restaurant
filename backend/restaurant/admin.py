from django.contrib import admin
from .models import RestaurantTable

# Register your models here.
# admin.site.register(RestaurantTable)

@admin.register(RestaurantTable)
class RestaurantTableAdmin(admin.ModelAdmin):
    list_display = ("table_number", "capacity", "location", "status")
    search_fields = ("table_number", "location")
    list_filter = ("location", "status")
    ordering = ("table_number",)