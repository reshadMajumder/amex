# urls pattern
from django.contrib import admin
from django.urls import  path, include

from .views import AdminLoginAPIView
urlpatterns = [
    path('login/', AdminLoginAPIView.as_view(), name='admin-login'),

]