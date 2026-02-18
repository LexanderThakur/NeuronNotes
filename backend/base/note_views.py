from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response


from .serializers import (
    UserSerializer,
    ProjectSerializer,
    ProjectCreateSerializer,
    FolderSerializer,
    FolderCreateSerializer,
    NoteSerializer,
    NoteCreateSerializer,
    NoteLinkSerializer,
    NoteLinkCreateSerializer,
    FollowLinkSerializer,
    FollowLinkCreateSerializer

)
from .models import ( 
    Project,
    Folder,
    Note,
    NoteLink,
    FollowLink,
)

from rest_framework.permissions import IsAuthenticated,AllowAny



from django.shortcuts import get_object_or_404


@api_view(["GET","POST"])
def notes(request,project_id):
    
    if request.method=="GET":
        qs= Note.objects.filter(project_id=project_id)
        serializer=NoteSerializer(qs,many=True)
        return Response({"message":serializer.data},status=200)

    if request.user != Project.objects.get(id=project_id).owner:
        return Response({"message":"unauthorized"},status=403)
    serializer=NoteCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(project_id=project_id)
    return Response({"message":"note created succesfully"},status=201)


@api_view(["GET","PATCH","DELETE"])
def note(request,note_id):
    obj = get_object_or_404(Note, id=note_id)
    if request.method=="GET":
        serializer= NoteSerializer(obj)
        return Response({"message":serializer.data})

    if request.user != obj.project.owner:
        return Response({"message":"unauthorized"},status=403)
    if request.method=="DELETE":
        
        obj.delete()
        return Response({"message":"success"})
    serializer=NoteCreateSerializer(obj,data=request.data,partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({"message": "note updated successfully"})

    