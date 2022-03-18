from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter, SimpleRouter

from djangojobboard.users.api.views import UserViewSet
from djangojobboard.core.api.views import (
    FileListView,
    FileDetailView, 
    FileCreateView, 
    FileUpdateView,
    FileDeleteView,
    MyDataDetailfilter,
)
if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)


app_name = "api"

urlpatterns = [
    path("files/", FileListView.as_view()),
    path("files/<pk>/", FileDetailView.as_view()),
    path("files/<pk>/update/", FileUpdateView.as_view()),
    path("files/<pk>/delete/", FileDeleteView.as_view()),
    path("create-files/", FileCreateView.as_view()),
    path('search/custom/', MyDataDetailfilter.as_view(), name='transcribe'),
]


urlpatterns += router.urls
