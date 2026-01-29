# urls pattern
from django.contrib import admin
from django.urls import  path, include

from .views import AdminLoginAPIView,LogoutAPIView,RefreshTokenAPIView
urlpatterns = [
    path('admin/login/', AdminLoginAPIView.as_view(), name='admin-login'),
    path('logout/', LogoutAPIView.as_view(), name='admin-logout'),
    path('token/refresh/', RefreshTokenAPIView.as_view(), name='token_refresh'),


]