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






@api_view(["POST","GET"])
def projects(request):
    if request=="GET":
        qs = Project.objects.exclude(owner=request.user,is_public=False)
        serializer = ProjectSerializer(qs,many=True)
        return Response({"message":serializer.data},status = 200)
    
    # give , name , des, is_public
    serializer= ProjectCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(owner = request.user)
    return Response({"message" : "successfully created"}, status =201)

@api_view(["GET"])
def my_projects(request):
    qs = Project.objects.filter(owner=request.user)
    serializer = ProjectSerializer(qs,many=True)
    return Response({"message":serializer.data},status = 200)

@api_view(["GET","PATCH","DELETE"])
def project(request,project_id):
    if request.method == "GET":
        serializer= ProjectSerializer(Project.objects.get(id=project_id))
        return Response({"message":serializer.data})
    if request.method=="DELETE":
        obj= Project.objects.get(id=project_id)
        if obj : obj.delete()
        return Response({"message":"success"},status=200)

    pass



@api_view(["POST","DELETE"])
def follow(request,project_id):
    if request.method == "POST":

        serializer=FollowLinkCreateSerializer(
            data= {"project":project_id},
            context={"request":request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message":"successfully followed"},status=201)
    
    FollowLink.objects.filter(user=request.user,project=project_id).delete()
    return Response({"message": "Unfollowed"},status=200)



@api_view(["GET"])
def followers(request,project_id):

    qs= FollowLink.objects.filter(project=project_id)
    serializer= FollowLinkSerializer(qs,many=True)
    return Response({"message":serializer.data},status=200)


