from django.shortcuts import render
from rest_framework import viewsets,status
from .models import ParkingLocation,ParkingResevation
from .serializers import ParkingLocationSerializer,ParkingResevationSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models.deletion import ProtectedError
from rest_framework.response import Response
from rest_framework.decorators import action



class ParkingLocationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ParkingLocation.objects.all()
    serializer_class = ParkingLocationSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ProtectedError as e:
            return Response(
              {"error": "Cannot delete this parking location because it has active reservations."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    #NOTE: detail=False means this is for the list, not a single object method specification to make request only get
    #NOTE: you cannot use @api_view decorator on ViewSet
    @action(detail=False, methods=['get'])  
    def available_parking_location(self):
        all_location = self.queryset.all()
        available_location = [location for location in all_location if location.available_slots > 0]
        serializer = self.get_serializer(available_location, many=True)
        return Response(serializer.data)


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
        