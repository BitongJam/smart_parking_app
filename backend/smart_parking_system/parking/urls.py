from rest_framework.routers import DefaultRouter
from .views import ParkingLocationViewSet

router = DefaultRouter()
router.register(r'parking-location',ParkingLocationViewSet)

urlpatterns = router.urls