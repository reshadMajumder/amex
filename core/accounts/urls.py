# urls pattern

from django.contrib import admin
from django.urls import include, path   
from django.urls import path

from .views import AccountsView

urlpatterns = [
    path('create/', AccountsView.as_view(), name='accounts-home'),
    
]