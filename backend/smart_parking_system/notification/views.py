from rest_framework import viewsets
from .models import Notification
from rest_framework.permissions import IsAuthenticated
from .serializers import NotificationSerializer
from rest_framework.response import Response
from rest_framework.decorators import action



class NotificationViewSet(viewsets.ModelViewSet):
    # permission_classes =[IsAuthenticated]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    @action(detail=False,methods=['get'])
    def user_notification_list(self,request):
        user = request.user
        notifications = self.queryset.filter(user_id = user.id,is_read=False)
        serilizer = self.get_serializer(notifications,many=True)
        return Response(serilizer.data)