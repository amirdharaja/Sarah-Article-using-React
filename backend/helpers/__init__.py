from django.conf import settings
from django.contrib.auth.hashers import make_password

from datetime import datetime

from django.contrib.auth.models import User

import jwt
from jwt import DecodeError

SALT = settings.SALT
HASHER = settings.HASHER

JWT_SECRET_KEY = settings.JWT_SECRET_KEY
JWT_ALGORITHM = settings.JWT_ALGORITHM



def make_hash(user_password):
    hash_password = make_password(user_password, salt=SALT, hasher=HASHER)
    return hash_password

def generate_token(data):
    if data:
        token = jwt.encode(data, JWT_SECRET_KEY, JWT_ALGORITHM).decode('utf-8')
        return token

    return None

def verify_token(token):
    if token:
        try:
            data = jwt.decode(token, JWT_SECRET_KEY, JWT_ALGORITHM)
            expire_date = datetime.strptime(data['expire'], '%Y-%m-%d %H:%M:%S.%f')
            if datetime.now() >= expire_date:
                return None
            check_role = User.objects.get(id=data['id'])
            if not check_role:
                return None
            if check_role.role == 'blocked_user':
                return None
            return data
        except jwt.DecodeError:
            return None

    return None
