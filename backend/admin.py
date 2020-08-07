from django.contrib import admin
from django.contrib.auth.models import User
from django.forms import ModelForm

from backend.models.ArticleModel import Article
from backend.models.CommentModel import Comments
from backend.models.LikeArticleModel import LikeArticle
from backend.models.LoginHistoryModel import LoginHistory



class ArticleAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'image',
        'content',
        'created_at',
        'updated_at',
    )
    search_fields = [
        'id',
        'title',
        'content',
    ]


class commentsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'article_id',
        'comment',
        'user_id',
        'created_at',
        'updated_at',
    )
    search_fields = (
        'id',
        'comment',
    )


class LikeArticleAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'article_id',
        'user_id',
        'is_like',
        'created_at',
        'updated_at',
    )
    search_fields = (
        'id',
        'is_like',
    )


class LoginHistoryAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user_id',
        'login_at'
    )
    search_fields = (
        'id',
        'login_at',
    )


admin.site.register(Article, ArticleAdmin)
admin.site.register(Comments, commentsAdmin)
admin.site.register(LikeArticle, LikeArticleAdmin)
admin.site.register(LoginHistory, LoginHistoryAdmin)