import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from .manager import UserManager, AdminUserManager


class Account(models.Model):
    class AccountType(models.TextChoices):
        CASH = "CASH", "Cash"
        CORPORATE = "CORPORATE", "Corporate"

    class BillingType(models.TextChoices):
        CASH = "CASH", "Pay Per Shipment"
        CREDIT = "CREDIT", "Monthly Credit"

    class Status(models.TextChoices):
        ACTIVE = "ACTIVE"
        ON_HOLD = "ON_HOLD"
        SUSPENDED = "SUSPENDED"
        CLOSED = "CLOSED"

    account_type = models.CharField(max_length=20, choices=AccountType.choices)
    billing_type = models.CharField(max_length=20, choices=BillingType.choices)

    # Canonical identity (used for billing, contracts, invoices)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)

    credit_limit = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    current_outstanding = models.DecimalField(max_digits=14, decimal_places=2, default=0)

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.email})"



class CorporateProfile(models.Model):
    '''
    Docstring for CorporateProfile
    stores the corporate profile information for an account.
    
    '''

    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    account = models.OneToOneField(
        Account,
        on_delete=models.CASCADE,
        related_name="corporate_profile"
    )

    company_name = models.CharField(max_length=255)
    trade_license_no = models.CharField(max_length=100)
    tin_number = models.CharField(max_length=50)
    bin_number = models.CharField(max_length=50)

    incorporation_country = models.CharField(max_length=100, default="Bangladesh")
    industry = models.CharField(max_length=100)

    verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.company_name

class CorporateContactPersonsInfo(models.Model):
    '''
    Docstring for CorporateContactPersonsInfo
    stores teh contact person information for a corporate profile.
    
    '''
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    corporate_profile = models.ForeignKey(
        CorporateProfile,
        on_delete=models.CASCADE,
        related_name="contact_persons"
    )

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    designation = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} ({self.designation})"



class User(AbstractBaseUser):
    '''
    Docstring for User
    holds the end users info for auth and profile.
    Inherits from AbstractBaseUser to leverage Django's built-in authentication features.

    '''
    
    class Role(models.TextChoices):
        OWNER = "OWNER"
        ADMIN = "ADMIN"
        STAFF = "STAFF"

    account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name="users",
        null=True,
        blank=True
    )

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=128)

    role = models.CharField(max_length=20, choices=Role.choices)
    is_primary_contact = models.BooleanField(default=False)

    email_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f'{self.email}-{self.role}'
