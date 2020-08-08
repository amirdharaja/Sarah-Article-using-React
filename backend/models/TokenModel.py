from django.db import models
from django.contrib.auth.models import User


class Token(models.Model):

    user    =     models.OneToOneField(User, on_delete=models.CASCADE, unique=True, default='')
    token   =     models.CharField(max_length=1000, blank=False, default='not defined')

    objects = models.Manager()

    class Meta:
        db_table = "tokens"