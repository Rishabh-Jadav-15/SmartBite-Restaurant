from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name

class MenuItem(models.Model):
    category = models.ForeignKey(
        Category,
          on_delete=models.CASCADE, 
          related_name='menu_items'
          )

    name = models.CharField(max_length=150)
    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    calories = models.IntegerField()
    protein = models.IntegerField()
    carbohydrates = models.IntegerField()
    sugar = models.IntegerField()
    fat = models.IntegerField()
    health_rating = models.IntegerField()

    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    unit = models.CharField(max_length=20)
    cost_per_unit = models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return self.name