from django.db import models
from django.conf import settings



class Notification(models.Model):
    ALERT_TYPE = [
        ('info','Info'),('danger','Danger'),('success','Success'),('warning','Warnging')
    ]

    message = models.TextField()
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='notifications')
    is_read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    alert_type = models.CharField(choices=ALERT_TYPE,default='info')