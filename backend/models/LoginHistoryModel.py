from django.db import models
from django.contrib.auth.models import User



class LoginHistory(models.Model):

    user     =   models.ForeignKey(User, on_delete=models.CASCADE, unique=False)
    login_at =   models.DateTimeField()

    objects = models.Manager()


    class Meta:
        db_table = "login_history"