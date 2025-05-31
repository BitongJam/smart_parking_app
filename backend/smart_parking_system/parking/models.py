from django.db import models
from django.conf import settings

# Create your models here.
class ParkingLocation(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=500)
    total_slots = models.IntegerField()
    reserved_slots = models.IntegerField()

    @property
    def available_slots(self):
        return self.total_slots - self.reserved_slots
    

class ParkingLot(models.Model):
    name = models.CharField(max_length=500)
    parking_location_id = models.ForeignKey(ParkingLocation,on_delete=models.PROTECT,related_name='parking_lots')


class ParkingResevation(models.Model):
    STATE_TYPE = [
        ('draft','Draft'),('cancel','Cancelled'),('approve','Approved')
    ]

    name = models.CharField(max_length=500)
    parking_lot_id = models.ForeignKey(ParkingLot,on_delete=models.PROTECT,related_name='parking_lot')
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT,related_name='reserve_user')
    reseve_datetime = models.DateTimeField()
    state = models.CharField(choices=STATE_TYPE,default='draft')
    