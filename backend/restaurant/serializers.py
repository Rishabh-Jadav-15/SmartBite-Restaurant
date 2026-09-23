from rest_framework import serializers
from .models import RestaurantTable

class RestauranrTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantTable
        fields=[
            "id",
            "table_number",
            "capacity",
            "location",
            "status"
        ]