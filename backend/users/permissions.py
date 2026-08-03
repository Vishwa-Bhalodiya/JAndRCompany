from rest_framework.permissions import BasePermission


class IsAdminRole(BasePermission):
    """Allows access only to authenticated users who are superusers or have role='admin'."""

    def has_permission(self, request, view):
        user = request.user
        return bool(
            user and user.is_authenticated and (user.is_superuser or user.role == "admin")
        )
