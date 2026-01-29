from django.contrib import admin

# Register your models here.
from .models import  User, Account,CorporateContactPersonsInfo,CorporateProfile

admin.site.register(User)
admin.site.register(Account)
admin.site.register(CorporateProfile)
admin.site.register(CorporateContactPersonsInfo)
