from django.db import models
from django.contrib.auth.models import User

from backend.models.ArticleModel import Article



class Comments(models.Model):

    user        =   models.ForeignKey(User, on_delete=models.CASCADE, unique=False)
    article      =   models.ForeignKey(Article, on_delete=models.CASCADE, unique=False)
    comment      =   models.CharField(max_length=512, blank=False)
    created_at  =   models.DateTimeField(auto_now_add=True, null=True)
    updated_at  =   models.DateTimeField(auto_now=True, null=True)

    objects = models.Manager()

    class Meta:
        db_table = "comments"
