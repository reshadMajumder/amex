import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

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


class User(AbstractBaseUser, PermissionsMixin):
    """
    Docstring for User
    Represents a user associated with an account.
    Inherits from AbstractBaseUser and PermissionsMixin to leverage Django's
    built-in authentication and permission features.
    ---this contains users who can log in to the system and perform actions based on their roles.---
    """

    class Role(models.TextChoices):
        OWNER = "OWNER", "Owner"
        ADMIN = "ADMIN", "Admin"
        STAFF = "STAFF", "Staff"

    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name="users"
    )

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)

    role = models.CharField(max_length=20, choices=Role.choices)
    is_primary_contact = models.BooleanField(default=False)

    email_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name='account_users',
        related_query_name='account_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='account_users',
        related_query_name='account_user',
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class AdminUser(AbstractBaseUser, PermissionsMixin):

    '''
    Docstring for AdminUser
    Represents an administrative user with elevated privileges.
    Inherits from AbstractBaseUser and PermissionsMixin to leverage Django's
    built-in authentication and permission features.
    

    '''

    class Role(models.TextChoices):
        SUPER_ADMIN = "SUPER_ADMIN"
        OPERATIONS = "OPERATIONS"
        FINANCE = "FINANCE"
        SUPPORT = "SUPPORT"

    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)

    role = models.CharField(max_length=30, choices=Role.choices)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this admin user belongs to.',
        related_name='admin_users',
        related_query_name='admin_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this admin user.',
        related_name='admin_users',
        related_query_name='admin_user',
    )

    USERNAME_FIELD = "email"
