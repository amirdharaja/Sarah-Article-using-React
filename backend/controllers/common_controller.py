from django.contrib.auth.models import User, auth
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from datetime import datetime, timedelta
import json


from backend.models.ArticleModel import Article
from backend.models.CommentModel import Comments
from backend.models.LikeArticleModel import LikeArticle
from backend.models.LoginHistoryModel import LoginHistory
from backend.models.TokenModel import Token

from backend.helpers import generate_token, verify_token

from backend.helpers import make_hash
from backend.email.email import send_email

from random import randint
from pluck import pluck

from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_202_ACCEPTED,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
)

@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'}, status=HTTP_400_BAD_REQUEST)

    user = auth.authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'}, status=HTTP_404_NOT_FOUND)

    if not user.is_staff:
        return activate_account(request, user)
        # return Response({'error': 'Account is not Active'}, status=HTTP_403_FORBIDDEN)

    data = {
        'id' : user.id,
        'username': user.username,
        'first_name': user.first_name,
        'expire':str(datetime.now() + timedelta(days=30))
    }

    token = generate_token(data)
    Token.objects.update_or_create(user_id=user.id, defaults={'token': token})
    return Response({'token': token}, status=HTTP_200_OK)


def activate_account(request, user):
    randam_number = randint(1000, 9999)
    subject = 'OTP - SARAH Articles'
    content = '''Dear, {} {}\n
                Enter the following OTP to activate your account
                Your OTP : {}'''.format(user.first_name, user.last_name, randam_number)
    send_email(user.email, subject, content)
    return Response({'OTP': 'OTP successfully send to your Email','id':user.id, 'otp':randam_number}, status=HTTP_200_OK)

@api_view(["POST"])
def verify_otp(request):
    data = json.loads(request.body.decode('utf-8'))
    User.objects.filter(id=data['id']).update(is_staff=True)
    token = Token.objects.filter(user_id=data['id']).first()
    return Response({'success': 'Your Account is activated', 'token':token.token}, status=HTTP_200_OK)


@api_view(["DELETE", "POST"])
def logout(request):
    request.user.auth_token.delete()
    auth.logout(request)
    return Response({'success': 'Log out success'}, status=HTTP_200_OK)