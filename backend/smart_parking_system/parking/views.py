from django.shortcuts import render
from rest_framework import viewsets
from .models import ParkingLocation,ParkingResevation
from .serializers import ParkingLocationSerializer,ParkingResevationSerializer
from rest_framework.permissions import IsAuthenticated

class ParkingLocationViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = ParkingLocation.objects.all()
    serializer_class = ParkingLocationSerializer


class ParkingResevationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ParkingResevation.objects.all()
    serializer_class = ParkingResevationSerializer

    def perform_create(self, serializer):
        # get the current user login the auto set it when reservation
        user = self.request.user
        serializer.save(user_id=user)