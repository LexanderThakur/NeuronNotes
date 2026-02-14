from django.urls import path 
from . import project_views
urlpatterns=[
    path("projects/",project_views.projects),
    path("projects/my/",project_views.my_projects),
    path("projects/<int:project_id>/",project_views.project),
    path("projects/<int:project_id>/follow/",project_views.follow),
    path("projects/<int:project_id>/followers/",project_views.followers),


]