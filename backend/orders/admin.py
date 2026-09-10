from django.contrib import admin
from .models import Order, OrderItem, Payment



# Register your models here.
# admin.site.register(Order)
# admin.site.register(OrderItem)
# admin.site.register(Payment)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "order_number",
        "customer",
        "order_type",
        "status",
        "total_amount",
        "created_at",
    )
    search_fields = (
        "order_number",
        "customer__name",
        "customer__email",
    )
    list_filter = ("order_type", "status")
    ordering = ("-created_at",)
    readonly_fields = ("created_at",)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "menu_item",
        "quantity",
        "unit_price",
        "subtotal",
    )
    search_fields = (
        "order__order_number",
        "menu_item__name",
    )
    ordering = ("order",)


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "payment_method",
        "amount",
        "status",
        "paid_at",
    )
    search_fields = (
        "order__order_number",
        "transaction_id",
    )
    list_filter = ("payment_method", "status")
    ordering = ("-paid_at",)
    readonly_fields = ("paid_at",)