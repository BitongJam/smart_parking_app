from django.shortcuts import render
from rest_framework import viewsets
from .models import ParkingLocation,ParkingLot
from .serializers import ParkingLocationSerializer

class ParkingLocationViewSet(viewsets.ModelViewSet):
    queryset = ParkingLocation.objects.all()
    serializer_class = ParkingLocationSerializer
