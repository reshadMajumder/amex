# urls pattern

from django.contrib import admin
from django.urls import include, path   
from django.urls import path

from .views import UserAccountsView

urlpatterns = [
    path('admin/user-get-or-create/', UserAccountsView.as_view(), name='accounts-home'),
    
]