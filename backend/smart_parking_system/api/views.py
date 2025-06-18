from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def ping(request):
    # this will be the view to check if the backend is availabel to be connected
    return Response({'message':"pong"})