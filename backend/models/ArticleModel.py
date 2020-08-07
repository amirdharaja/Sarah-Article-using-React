from django.db import models



class Article(models.Model):

    title       =   models.CharField(max_length=128, blank=False)
    image       =   models.FileField(upload_to='images/', null=True)
    content     =   models.TextField(null=True)
    created_at  =   models.DateTimeField(auto_now_add=True, null=True)
    updated_at  =   models.DateTimeField(auto_now=True, null=True)

    objects = models.Manager()


    class Meta:
        db_table = "articles"