from django.urls import path 
from . import project_views
urlpatterns=[
    path("projects/",project_views.projects),
    path("projects/my/",project_views.my_projects),
    
]