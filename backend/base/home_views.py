from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from .models import Bookmark
from .serializers import BookmarkCreateSerializer


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