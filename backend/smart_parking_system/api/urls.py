from django.urls import  path,include


urlpatterns  = [
    path('parking/',include('parking.urls'))
]