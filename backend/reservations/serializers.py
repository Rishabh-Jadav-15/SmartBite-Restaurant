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

    def validate(self, attrs):
        reservation_date = attrs.get(
            "reservation_date",
            getattr(self.instance, "reservation_date", None)
        )

        start_time = attrs.get(
            "start_time",
            getattr(self.instance, "start_time", None)
        )

        end_time = attrs.get(
            "end_time",
            getattr(self.instance, "end_time", None)
        )

        table = attrs.get(
            "table",
            getattr(self.instance, "table", None)
        )

        party_size = attrs.get(
            "party_size",
            getattr(self.instance, "party_size", None)
        )

        # 1. Validate reservation time

        if start_time and end_time:
            if end_time <= start_time:
                raise serializers.ValidationError({
                    "end_time": "End time must be later than start time."
                })

        # 2. Validate party size

        if party_size is not None:
            if party_size <= 0:
                raise serializers.ValidationError({
                    "party_size": "Party size must be greater than 0."
                })

        # 3. Validate table capacity

        if table and party_size:
            if party_size > table.capacity:
                raise serializers.ValidationError({
                    "party_size": (
                        f"Party size cannot exceed the table capacity "
                        f"of {table.capacity}."
                    )
                })

        # 4. Validate table status

        if table:
            if table.status.lower() != "available":
                raise serializers.ValidationError({
                    "table": "This table is currently unavailable."
                })

        # 5. Validate overlapping reservation

        if (
            reservation_date
            and start_time
            and end_time
            and table
        ):
            overlapping_reservations = Reservation.objects.filter(
                table=table,
                reservation_date=reservation_date,
            ).exclude(
                status=Reservation.Status.CANCELLED
            )

            # When updating an existing reservation,don't compare it against itself.
            if self.instance:
                overlapping_reservations = overlapping_reservations.exclude(
                    pk=self.instance.pk
                )

            overlapping_reservations = overlapping_reservations.filter(
                start_time__lt=end_time,
                end_time__gt=start_time,
            )

            if overlapping_reservations.exists():
                raise serializers.ValidationError({
                    "table": (
                        "This table is already reserved for the "
                        "selected time."
                    )
                })

        return attrs