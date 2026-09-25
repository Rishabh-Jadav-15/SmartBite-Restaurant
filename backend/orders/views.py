from django.shortcuts import render
from rest_framework import generics

from .models import Order,OrderItem, Payment
from .serializers import OrderSerializer,OrderItemSerializer, PaymentSerializer

# Create your views here.
class OrderListView(generics.ListCreateAPIView):
    queryset = Order.objects.select_related(
        "customer"
        ).prefetch_related(
            "items__menu_item"
        ).all()

    serializer_class = OrderSerializer

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.select_related(
        "customer"
    ).prefetch_related(
        "item__menu_item"
    ).all()

    serializer_class = OrderSerializer

class OrderItemListView(generics.ListCreateAPIView):
    queryset = OrderItem.objects.select_related(
        "order",
        "menu_item",
        ).all()

    serializer_class = OrderItemSerializer

class OrderItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.select_related(
        "order",
        "menu_item",
    ).all()

    serializer_class = OrderItemSerializer

class PaymentListView(generics.ListCreateAPIView):
    queryset = Payment.objects.select_related(
        "order",
    ).all()

    serializer_class = PaymentSerializer

class PaymentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payment.objects.select_related(
        "order",
    ).all()

    serializer_class = PaymentSerializer