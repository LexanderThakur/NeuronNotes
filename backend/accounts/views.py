
from django.shortcuts import render

# Create your views here.


from rest_framework.response import Response 

from rest_framework.decorators import api_view,authentication_classes , permission_classes

from django.contrib.auth import get_user_model,authenticate
from rest_framework.permissions import IsAuthenticated,AllowAny

from .jwt_utils import create_token,decode_token

from .auth import customjwt
from rest_framework import status

User= get_user_model()



@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def register(request):
    print(request.data)
    user_email=request.data.get("user_email")


    if User.objects.filter(email=user_email).exists():
        
        return Response(
            {"error":"email already in use"},
            status=400
        )

    user = User(username=user_email,email=user_email)


    user.set_password(request.data.get("user_password"))

    user.save()

    token = create_token(user)

    return Response({"token":token},status=201)


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def login(request):
    user_email= request.data.get("user_email")

    user = authenticate(username=user_email,password=request.data.get("user_password"))

    if not user:
        
        return Response({"error":"invalid credentials"},status=status.HTTP_401_UNAUTHORIZED)

    token=create_token(user)
    return Response({"token":token},status=200)

@api_view(['GET'])
@authentication_classes([customjwt])
@permission_classes([IsAuthenticated])
def me(request):

    return Response({
            "username": request.user.username,
            "email": request.user.email,
        })