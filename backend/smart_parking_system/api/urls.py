from django.urls import  path,include
from .views import ping
from users.views import login,user_profile

urlpatterns  = [
    path('parking/',include('parking.urls')),
    path('ping/',ping),
    path('login-user/',login),
    path('user-profile/',user_profile)
]