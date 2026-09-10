from django.contrib import admin
from .models import Review

# Register your models here.
# admin.site.register(Review)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "customer",
        "menu_item",
        "rating",
        "created_at",
    )
    search_fields = (
        "customer__name",
        "customer__email",
        "menu_item__name",
        "comment",
    )
    list_filter = ("rating",)
    ordering = ("-created_at",)
    readonly_fields = ("created_at",)