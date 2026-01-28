from django.contrib import admin

# Register your models here.
from .models import AdminUser, User, Account,CorporateContactPersonsInfo,CorporateProfile

admin.site.register(AdminUser)
admin.site.register(User)
admin.site.register(Account)
admin.site.register(CorporateProfile)
admin.site.register(CorporateContactPersonsInfo)
