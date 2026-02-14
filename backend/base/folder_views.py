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

@api_view(['GET','POST'])
def folders(request,project_id):
    if request.method=='GET':
        qs= Folder.objects.filter(project=project_id)
        serializer= FolderSerializer(qs,many=True)
        return Response({"message":serializer.data},status=200)
    
    
    serializer= FolderCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(project_id=project_id)
    return Response({"message":"folder created successfully"},status=201)

