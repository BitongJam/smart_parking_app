from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    active = models.BooleanField(default=True)


# Create your models here.
class UserProfile(models.Model):
    user_id = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField()
    birthdate = models.DateField(auto_now_add=True)
    email = models.EmailField()
    image = models.ImageField(upload_to="avatars/",blank=True,null=True)
    created_at = models.DateField(auto_now_add=True)