from rest_framework import serializers
from parking.models import ParkingLocation,ParkingLot,ParkingResevation

class ParkingLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingLocation
        # fields = '__all__'
        fields = ['id','name','total_slots','available_slots']

    # def get_available_slots(self,obj):
    #     return obj.available_slots

class ParkingLotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingLot
        fields = '__all__'


class ParkingResevationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingResevation
        fields = '__all__'
        read_only_fields = ['user_id']