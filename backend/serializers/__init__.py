from django.contrib.auth.models import User

from rest_framework.serializers import ModelSerializer
from rest_framework.authtoken.models import Token

from backend.models.ArticleModel import Article
from backend.models.CommentModel import Comments
from backend.models.LikeArticleModel import LikeArticle
from backend.models.LoginHistoryModel import LoginHistory



class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'first_name',
            'last_name',
            'email',
        ]
        extra_kwargs = {
            'password': {'write_only':True, 'required':True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class ArticleSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class CommentsSerializer(ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'


class LikeArticleSerializer(ModelSerializer):
    class Meta:
        model = LikeArticle
        fields = '__all__'


class LoginHistorySerializer(ModelSerializer):
    class Meta:
        model = LoginHistory
        fields = '__all__'
