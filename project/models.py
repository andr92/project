from django.db import models
#class tableTest(models.Model):
#  name = models.CharField(max_length=30)

class Users(models.Model):
    extension = models.CharField(max_length=200)
    password = models.CharField(max_length=20, blank=True)
    name = models.CharField(max_length=50, blank=True)
    voicemail = models.CharField(max_length=50, blank=True)
    ringtimer = models.IntegerField(blank=True, null=True)
    noanswer = models.CharField(max_length=100, blank=True)
    recording = models.CharField(max_length=50, blank=True)
    outboundcid = models.CharField(max_length=50, blank=True)
    sipname = models.CharField(max_length=50, blank=True)
    mohclass = models.CharField(max_length=80, blank=True)
class Meta:
    managed = False
    db_table = 'users'

# Create your models here.
from django.contrib import admin
admin.site.register(Users)
