from django.shortcuts import render

# Create your views here.



from django.http import JsonResponse
from rest_framework.decorators import APIView

from rest_framework.permissions import IsAuthenticated  
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User
from .serializers import UserSerializer
from .permissions import IsAdminUser, IsSuperAdminUser
from rest_framework.response import Response



