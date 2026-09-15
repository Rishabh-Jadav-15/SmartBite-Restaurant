from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = authenticate(
            request=request,
            email=email,
            password=password
        )

        if user is None:
            return Response(
                {"detail":"Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "access":str(refresh.access_token),
            "refresh":str(refresh),
            "user":{
                "id":user.id,
                "name":user.name,
                "email":user.email,
                "role":user.role,
            }
        })

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
        })