

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from accounts.permissions import IsAdminUser, IsSuperAdminUser
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from accounts_auth.models import AdminUser


class AdminLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"detail": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, email=email, password=password)

        if not user:
            return Response(
                {"detail": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not isinstance(user, AdminUser):
            return Response(
                {"detail": "Not an admin user"},
                status=status.HTTP_403_FORBIDDEN,
            )

        if not user.is_active:
            return Response(
                {"detail": "Account is disabled"},
                status=status.HTTP_403_FORBIDDEN,
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "role": user.role,
                },
            },
            status=status.HTTP_200_OK,
        )


class LogoutAPIView(APIView):
    '''
    user can logout by blacklisting the refresh token
    '''
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"detail": "Logout successful"},
                status=status.HTTP_205_RESET_CONTENT,
            )
        except Exception as e:
            return Response(
                {"detail": "Invalid token"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
class RefreshTokenAPIView(APIView):
    '''
    user can get new access token by providing valid refresh token
    '''
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"detail": "Refresh token is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)

            return Response(
                {"access": access_token},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"detail": "Invalid refresh token"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class AdminUsersView(APIView):
    '''
    Admin user login view
    if success return access and refresh token
    '''
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser, IsSuperAdminUser]

    # def get(self, request, id=None):
    #     try:
    #         if id:
    #             admin_user = AdminUser.objects.get(id=id)
    #             serializer = AdminUserSerializer(admin_user)
    #             return JsonResponse({'AdminUser': serializer.data}, status=200 ,safe=False)
    #         else:
    #             admin_users = AdminUser.objects.all()
    #             serializer = AdminUserSerializer(admin_users, many=True)
    #             return JsonResponse({'AdminUsers': serializer.data}, status=200 ,safe=False)
    #     except Exception as e:
    #         return JsonResponse({'error': str(e)}, status=500)
        

