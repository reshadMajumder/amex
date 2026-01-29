from django.db import models

# Create your models here.
from accounts.manager import UserManager, AdminUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


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
    name = models.CharField(max_length=255, blank=True, default='')

    role = models.CharField(max_length=30, choices=Role.choices, default=Role.SUPER_ADMIN)

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
    REQUIRED_FIELDS = []
    
    objects = AdminUserManager()
    
    def __str__(self):
        return self.email
