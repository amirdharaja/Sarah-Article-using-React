from django.contrib.auth.models import User

from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from backend.models.ArticleModel import Article
from backend.models.CommentModel import Comments
from backend.models.LikeArticleModel import LikeArticle
from backend.models.LoginHistoryModel import LoginHistory
from backend.serializers import (
    UserSerializer,
    ArticleSerializer,
    CommentsSerializer,
    LikeArticleSerializer,
    LoginHistorySerializer
)




class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class CommentsViewSet(ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer


class LikeArticleViewSet(ModelViewSet):
    queryset = LikeArticle.objects.all()
    serializer_class = LikeArticleSerializer


class LoginHistoryViewSet(ModelViewSet):
    queryset = LoginHistory.objects.all()
    serializer_class = LoginHistorySerializer