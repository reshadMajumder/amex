
# serializers
from rest_framework import serializers
from .models import User, Account, CorporateProfile, CorporateContactPersonsInfo


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_type','billing_type','name','email','phone','credit_limit','current_outstanding','status','created_at', 'updated_at']
        


class CorporateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorporateProfile
        fields = ['id', 'account', 'company_name', 'trade_license_no', 'tin_number', 'bin_number', 'incorporation_country', 'industry', 'verified', 'verified_at', 'created_at']    

class CorporateContactPersonsInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorporateContactPersonsInfo
        fields = ['id', 'corporate_profile', 'contact_name', 'contact_email', 'contact_phone', 'designation', 'created_at'] 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','account' ,'email', 'name', 'phone', 'role', 'is_primary_contact', 'email_verified', 'is_active', 'created_at', 'last_login']