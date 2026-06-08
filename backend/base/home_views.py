from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from .models import Bookmark
from .serializers import BookmarkCreateSerializer


from .models import BacklogTask,Project,Note
from .serializers import BacklogTaskSerializer
@api_view(["GET", "POST"])
def bookmarks(request):

    if request.method == "GET":
        qs = Bookmark.objects.filter(user=request.user)

        serializer = BookmarkCreateSerializer(
            qs,
            many=True
        )

        return Response(serializer.data)

    if request.method == "POST":
        serializer = BookmarkCreateSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        return Response({
            "message": "Bookmark added successfully."
        })


@api_view(["DELETE"])
def bookmark(request, bookmark_id):

    obj = get_object_or_404(
        Bookmark,
        id=bookmark_id,
        user=request.user
    )

    obj.delete()

    return Response({
        "message": "Deleted Bookmark"
    })

@api_view(["GET", "POST"])
def backlog_tasks(request):

    if request.method == "GET":

        qs = BacklogTask.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = BacklogTaskSerializer(
            qs,
            many=True
        )

        return Response(serializer.data)

    serializer = BacklogTaskSerializer(
        data=request.data
    )

    serializer.is_valid(
        raise_exception=True
    )

    serializer.save(
        user=request.user
    )

    return Response(
        serializer.data,
        status=201
    )

@api_view(["PATCH", "DELETE"])
def backlog_task(request, task_id):

    task = get_object_or_404(
        BacklogTask,
        id=task_id,
        user=request.user
    )

    if request.method == "PATCH":

        task.completed = (
            not task.completed
        )

        task.save()

        return Response({
            "completed": task.completed
        })

    task.delete()

    return Response({
        "message": "Deleted"
    })




@api_view(["GET"])
def connection_projects(request):

    Projects_qs = Project.objects.filter(owner = request.user)

    data=[]
    for q in Projects_qs:
        data.append({
            "id":q.id,
            "name":q.name
        })
    return Response({"message":data})



@api_view(["GET"])
def connection_percentage(request,project_id):
    obj = get_object_or_404(Project,id=project_id,owner=request.user)

    notes_qs = Note.objects.filter(project=obj)
    total= len(notes_qs)
    if total == 0:
        return Response({"message": 0,"total":0})
    

    connected =0
    for note in notes_qs:
        if note.folder!=None:
            connected+=1
    percentage = round((connected / total) * 100)
    return Response({"message":percentage,"total":total})
