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






@api_view(["GET","POST"])
def notes(request,project_id):
    if request.method=="GET":
        qs= Note.objects.filter(project_id=project_id)
        serializer=NoteSerializer(qs,many=True)
        return Response({"message":serializer.data},status=200)

    serializer=NoteCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(project_id=project_id)
    return Response({"message":"note created succesfully"},status=201)
