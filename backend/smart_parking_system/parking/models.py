from django.db import models
from django.conf import settings

# Create your models here.
class ParkingLocation(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=500)
    total_slots = models.IntegerField(default=0)

    @property
    def available_slots(self):
        return self.total_slots - self.reserved_slots
    
    @property
    def reservation_count(self):
        return self.reservations.count()
    
    @property
    def reserved_slots(self):
        return self.reservations.filter(state='approve').count()
    


class ParkingResevation(models.Model):
    STATE_TYPE = [
        ('draft','Draft'),('cancel','Cancelled'),('approve','Approved'),('close','Closed')
    ]

    name = models.CharField(max_length=500)
    parking_location_id = models.ForeignKey(ParkingLocation,on_delete=models.PROTECT,related_name='reservations',null=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT,related_name='reservations')
    start_datetime = models.DateTimeField(null=True)
    end_datetime = models.DateField(null=True)
    state = models.CharField(choices=STATE_TYPE,default='draft')
    