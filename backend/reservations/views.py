from django.shortcuts import render

from rest_framework import generics

from .models import Reservation
from .serializers import ReservationSerializer


class ReservationListView(generics.ListCreateAPIView):
    queryset = Reservation.objects.select_related(
        "customer",
        "table",
    ).all()

    serializer_class = ReservationSerializer


class ReservationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.select_related(
        "customer",
        "table",
    ).all()

    serializer_class = ReservationSerializer
