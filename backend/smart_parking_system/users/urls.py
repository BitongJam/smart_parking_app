from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import get_current_user,get_list_users,create_user,update_active_user,update_current_user_details,update_user_password,ModifiedTokenObtainPairView

urlpatterns = [
    path('token/', ModifiedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/',get_current_user),
    path('list/',get_list_users),
    path('create/',create_user),
    path('update_active_user/<int:user_id>',update_active_user),
    path('update_current_user_details/<int:user_id>',update_current_user_details),
    path('update_user_password/<int:user_id>',update_user_password)

]