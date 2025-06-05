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

    @action(detail=False, methods=['get'])
    def user_reservation_history(self,request):
        #get the user reqeuster detail
        user = request.user
        history = self.queryset.filter(user_id = user.id)
        serializer = self.get_serializer(history,many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods =['get'])
    def user_active_reservations(self,request):
        user = request.user
        reservations = self.queryset.filter(user_id = user.id, state="active")
        serializer = self.get_serializer(reservations,many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods =['get'])
    def user_draft_reservations(self,request):
        reservations= self.queryset.filter(state='draft')
        serializer = self.get_serializer(reservations,many=True)
        return Response(serializer.data)
        