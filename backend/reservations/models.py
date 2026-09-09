from django.db import models
from accounts.models import User
from restaurant.models import RestaurantTable


# Create your models here.
class Reservation(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        CONFIRMED = "confirmed", "Confirmed"
        CANCELLED = "cancelled", "Cancelled"
        COMPLETED = "completed", "Completed"

    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reservations'
    )

    table = models.ForeignKey(
        RestaurantTable,
        on_delete=models.CASCADE,
        related_name="reservations"
    )

    reservation_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    party_size = models.IntegerField()
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    special_requests = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.name} - Table {self.table.table_number}"
        