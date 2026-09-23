from rest_framework import serializers

from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(
        source="customer.name",
        read_only=True
    )

    table_number = serializers.CharField(
        source="table.table_number",
        read_only=True
    )

    class Meta:
        model = Reservation
        fields = [
            "id",
            "customer",
            "customer_name",
            "table",
            "table_number",
            "reservation_date",
            "start_time",
            "end_time",
            "party_size",
            "status",
            "special_requests",
            "created_at",
        ]

        read_only_fields = [
            "created_at",
        ]