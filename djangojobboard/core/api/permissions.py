from rest_framework.permissions import BasePermission


class IsVideoOwner(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_object_permission(self, request, view, obj):
        video = obj
        return video.user == request.user