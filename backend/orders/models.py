from django.db import models
from accounts.models import User
# Create your models here.

class Order(models.Model):
    class OrderType(models.TextChoices):
        DINE_IN = "dine_in","Dine In"
        TAKEAWAY = "takeaway","Takeaway"
        DELIVERY = "delivery","Delivery"
    
    class Status(models.TextChoices):
        PENDING = "pending","Pending"
        CONFIRMED = "confirmed","Confirmed"
        PREPARING = "preparing","Preparing"
        READY = "ready","Ready"
        COMPLETED = "completed","Completed"
        CANCELLED = "cancelled","Cancelled"

    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='orders'
    )
    order_number = models.CharField(max_length=30, unique=True)
    order_type = models.CharField(
        max_length=20,
        choices=OrderType.choices,
        default=OrderType.DINE_IN
    )
    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.PENDING
    )

    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.order_number

    

class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items'
    )
    menu_item = models.ForeignKey(
        "menu.MenuItem",
        on_delete=models.CASCADE,
        related_name='order_items'
    )
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.order.order_number} - {self.menu_item.name}"
    

class Payment(models.Model):
    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        related_name='payment'
    )
    payment_method = models.CharField(max_length=30)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20)
    transaction_id = models.CharField(
        max_length=100,
        unique=True,
        null=True,
        blank=True
    )

    paid_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.order.order_number} - {self.status}"