from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

import jwt

from django.contrib.auth import get_user_model
from .jwt_utils import create_token,decode_token
User= get_user_model()


class customjwt(BaseAuthentication):
    def authenticate(self,request):


        header = request.headers.get("Authorization")
        if not header:
            return None


        try:
            token= header.split()[1]

        except Exception as e:
            raise AuthenticationFailed("Invalid header")

        payload = decode_token(token)   

        if not payload:
            raise AuthenticationFailed("Invalid or expired token")

             
        try:
            user= User.objects.get(id= payload.get("user_id"))
            if not user:
                raise AuthenticationFailed("user not in db")
        except Exception as e:
            raise AuthenticationFailed("could not get user")

        return (user,token)