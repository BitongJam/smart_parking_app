from rest_framework import serializers
from parking.models import ParkingLocation,ParkingResevation

class ParkingResevationSerializer(serializers.ModelSerializer):
    parking_location_name = serializers.CharField(source = 'parking_location_id.name',read_only=True)
    user_name = serializers.CharField(source ='user_id.name',read_only=True)

    class Meta:
        model = ParkingResevation
        fields = '__all__'
        read_only_fields = ['user_id']


class ParkingLocationSerializer(serializers.ModelSerializer):
    reservations = ParkingResevationSerializer(many=True, read_only=True)  # <-- Here, outside Meta

    class Meta:
        model = ParkingLocation
        # fields = '__all__'
        fields = ['id','address','name','total_slots','available_slots','reserved_slots','reservation_count','reservations']

    # def get_available_slots(self,obj):
    #     return obj.available_slots
