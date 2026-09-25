from rest_framework import serializers

from .models import Order, OrderItem, Payment


class OrderItemSerializer(serializers.ModelSerializer):
    menu_item_name = serializers.CharField(
        source="menu_item.name",
        read_only=True
    )

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "order",
            "menu_item",
            "menu_item_name",
            "quantity",
            "unit_price",
            "subtotal",
        ]


class OrderSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(
        source="customer.name",
        read_only=True
    )

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Order
        fields = [
            "id",
            "customer",
            "customer_name",
            "order_number",
            "order_type",
            "status",
            "subtotal",
            "tax",
            "discount",
            "total_amount",
            "created_at",
            "cancelled_at",
            "deleted_at",
            "items",
        ]

        read_only_fields = [
            "created_at",
            "cancelled_at",
            "deleted_at",
        ]

class PaymentSerializer(serializers.ModelSerializer):
    order_number = serializers.CharField(
        source = "order.order_number",
        read_only = True
    )

    class Meta:
        model = Payment
        fields = [
            "id",
            "order",
            "order_number",
            "payment_method",
            "amount",
            "status",
            "transaction_id",
            "paid_at",
        ]

        read_only_fields=["paid_at",]

    def validate(self, attrs):
        order = attrs.get(
            "order",
            getattr(self.instance, "order", None)
        )

        amount = attrs.get(
            "amount",
            getattr(self.instance, "amount", None)
        )

        if order and amount is not None:
            if amount!= order.total_amount:
                raise serializers.ValidationError({
                    "amount":(
                        f"Payment amount must match the order total" 
                        f"of {order.total_amount}."
                    )
                })

        if order:
            existing_payment = Payment.objects.filter(
                order=order
            )

            if self.instance:
                existing_payment = existing_payment.exclude(
                    pk=self.instance.pk
                )

            if existing_payment.exists():
                raise serializers.ValidationError({
                    "order":"This order already has a payment."
                })
        return attrs