from rest_framework.routers import DefaultRouter
from .views import NotificationViewSet

router =DefaultRouter();
router.register(r'notification',NotificationViewSet)

urlpatterns = router.urls