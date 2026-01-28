from accounts.models import AdminUser
from rest_framework.permissions import BasePermission
class IsAdminUser(BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return bool(request.user and isinstance(request.user, AdminUser) and request.user.is_authenticated)

class IsSuperAdminUser(BasePermission):
    """
    Allows access only to super admin users.
    """

    def has_permission(self, request, view):
        return bool(request.user and isinstance(request.user, AdminUser) and request.user.role == AdminUser.Role.SUPER_ADMIN and request.user.is_authenticated)
    
class IsOperationsUser(BasePermission):
    """
    Allows access only to operations users.
    """

    def has_permission(self, request, view):
        return bool(request.user and isinstance(request.user, AdminUser) and request.user.role == AdminUser.Role.OPERATIONS and request.user.is_authenticated)


class IsFinanceUser(BasePermission):
    """
    Allows access only to finance users.
    """

    def has_permission(self, request, view):
        return bool(request.user and isinstance(request.user, AdminUser) and request.user.role == AdminUser.Role.FINANCE and request.user.is_authenticated)