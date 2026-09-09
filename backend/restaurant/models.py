from django.db import models

# Create your models here.
class RestaurantTable(models.Model):
    table_number = models.CharField(max_length=20, unique=True)
    capacity = models.IntegerField()
    location = models.CharField(max_length=50)
    status = models.CharField(max_length=20)

    def __str__(self):
        return f"Table {self.table_number}"
    