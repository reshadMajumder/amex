from django.shortcuts import render

# Create your views here.



from django.http import JsonResponse
from rest_framework.decorators import APIView

from rest_framework.permissions import IsAuthenticated  
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Account, User
from .serializers import AccountSerializer, UserSerializer
from .permissions import IsAdminUser, IsSuperAdminUser
from rest_framework.response import Response





class UserAccountsView(APIView):
    '''
    create company accounts,
    get company accounts list
    get the details of company

    '''
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser, IsSuperAdminUser]

    def get(self, request,id=None):
        try:
            if id:
                user = User.objects.get(id=id)
                serializer = UserSerializer(user)
                return Response({'Account': serializer.data}, status=200)
            else:
                users = User.objects.all()
                serializer = UserSerializer(users, many=True)
                return Response({'Accounts': serializer.data}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
    def post(self, request):
        try:
            data = request.data
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'User Account created successfully', 'Account': serializer.data}, status=201)
            return Response({'errors': serializer.errors}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        


    def put(self, request, id):
        try:
            user = User.objects.get(id=id)
            data = request.data
            serializer = UserSerializer(user, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'User Account updated successfully', 'Account': serializer.data}, status=200)
            return Response({'errors': serializer.errors}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
            user.delete()
            return Response({'message': 'User Account deleted successfully'}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        


class AccountView(APIView):
    '''
    create company accounts,
    get company accounts list
    get the details of company

    '''
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser, IsSuperAdminUser]

    def get(self, request,id=None):
        try:
            if id:
                account = Account.objects.get(id=id)
                serializer = AccountSerializer(account)
                return Response({'Account': serializer.data}, status=200)
            else:
                accounts = Account.objects.all()
                serializer = AccountSerializer(accounts, many=True)
                return Response({'Accounts': serializer.data}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        

    def post(self, request):
        try:
            data = request.data
            serializer = AccountSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Company Account created successfully', 'Account': serializer.data}, status=201)
            return Response({'errors': serializer.errors}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
    def put(self, request, id):
        try:
            account = Account.objects.get(id=id)
            data = request.data
            serializer = AccountSerializer(account, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Company Account updated successfully', 'Account': serializer.data}, status=200)
            return Response({'errors': serializer.errors}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
    def delete(self, request, id):
        try:
            account = Account.objects.get(id=id)
            account.delete()
            return Response({'message': 'Company Account deleted successfully'}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)