from django.shortcuts import render
from rest_framework import generics
from .models import RestaurantTable
from .serializers import RestauranrTableSerializer

# Create your views here.
class RestaurantTableListView(generics.ListCreateAPIView):
    queryset = RestaurantTable.objects.all()
    serializer_class = RestauranrTableSerializer


class RestaurantTableDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RestaurantTable.objects.all()
    serializer_class = RestauranrTableSerializer