

import jwt 

from datetime import datetime, timedelta

from django.conf import settings
SECRET= settings.SECRET_KEY

def create_token(user):


    payload={
        'user_id':user.id,
        'exp':datetime.utcnow() + timedelta(days=30),
        'iat':datetime.utcnow()

    }

    token= jwt.encode(
        payload,
        SECRET,
        algorithm="HS256"
    )

    return token



def decode_token(encoded_jwt):

    try:
        payload= jwt.decode(encoded_jwt,SECRET,algorithms=["HS256"])
        return payload
    except Exception as e:
        return None 

    