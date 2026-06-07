from django.urls import path 
from . import project_views,folder_views,note_views,graph_views,home_views
urlpatterns=[
    path("",project_views.home),
    ## project realted
    path("projects/",project_views.projects),
    path("projects/my/",project_views.my_projects),
    path("projects/<int:project_id>/",project_views.project),
    path("projects/<int:project_id>/follow/",project_views.follow),
    path("projects/<int:project_id>/followers/",project_views.followers),
    path("projects/following/",project_views.following),
    path("projects/manage/<int:project_id>/",project_views.manage_project),
    path("projects/totalProjects/",project_views.number_of_projects),
    path("projects/totalFollowing/",project_views.number_of_following),

    # folder related
    path('projects/<int:project_id>/folders/',folder_views.folders),
    path('folders/<int:folder_id>/',folder_views.folder),


    # notes related
    path("projects/<int:project_id>/notes/",note_views.notes),
    path("notes/<int:note_id>/",note_views.note),


    path("projects/<int:project_id>/graph/",graph_views.graph),

   path("home/bookmarks/", home_views.bookmarks),
   path("home/bookmarks/<int:bookmark_id>/", home_views.bookmark),
   path(
    "home/tasks/",
    home_views.backlog_tasks
),

path(
    "home/tasks/<int:task_id>/",
    home_views.backlog_task
),
]