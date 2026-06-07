from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from .models import Bookmark
from .serializers import BookmarkCreateSerializer


from .models import BacklogTask
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