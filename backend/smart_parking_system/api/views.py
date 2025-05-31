from rest_framework.response import Response
from rest_framework.decorators import api_view
from parking.models import ParkingLocation
from parking.serializers import ParkingLocationSerializer

@api_view(['GET'])
def getData(request):
    pl = ParkingLocation.objects.all()
    pls = ParkingLocationSerializer(pl,many=True)
    return Response(pls.data)