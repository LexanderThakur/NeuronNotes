from django.urls import path 
from . import project_views,folder_views,note_views
urlpatterns=[
    ## project realted
    path("projects/",project_views.projects),
    path("projects/my/",project_views.my_projects),
    path("projects/<int:project_id>/",project_views.project),
    path("projects/<int:project_id>/follow/",project_views.follow),
    path("projects/<int:project_id>/followers/",project_views.followers),
    path("projects/following/",project_views.following),
    path("projects/manage/<int:project_id>/",project_views.manage_project),


    # folder related
    path('projects/<int:project_id>/folders/',folder_views.folders),
    path('folders/<int:folder_id>/',folder_views.folder),


    # notes related
    path("projects/<int:project_id>/notes/",note_views.notes),
    path("notes/<int:note_id>/",note_views.note),


]