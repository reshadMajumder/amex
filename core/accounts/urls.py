# urls pattern

from django.contrib import admin
from django.urls import include, path   
from django.urls import path

from .views import UserAccountsView

urlpatterns = [
    path('admin/user-get-or-create/', UserAccountsView.as_view(), name='accounts-home'),
    path('admin/user-get-or-create/<int:id>/', UserAccountsView.as_view(), name='accounts-detail'),
    path('admin/user-update-or-delete/<int:id>/', UserAccountsView.as_view(), name='accounts-delete'),
    
]