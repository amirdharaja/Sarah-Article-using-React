from django.urls import path
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from backend.viewsets import (
    ArticleViewSet,
    CommentsViewSet,
    LikeArticleViewSet,
    LoginHistoryViewSet,
    UserViewSet
)


router = DefaultRouter()
router.register('articles', ArticleViewSet)
router.register('comments', CommentsViewSet)
router.register('likes', LikeArticleViewSet)
router.register('login-histories', LoginHistoryViewSet)
router.register('users', UserViewSet)



urlpatterns = [
    path('', include(router.urls))
]