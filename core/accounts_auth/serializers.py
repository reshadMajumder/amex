

# serializers
from rest_framework import serializers
from accounts.models import  AdminUser


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ['id', 'email', 'name', 'phone', 'role', 'is_active', 'created_at', 'last_login']

        