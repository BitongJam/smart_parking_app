from rest_framework.routers import DefaultRouter
from .views import ParkingLocationViewSet,ParkingResevationViewSet

router = DefaultRouter()
router.register(r'parking-location',ParkingLocationViewSet)
router.register(r'reservation',ParkingResevationViewSet)

urlpatterns = router.urls