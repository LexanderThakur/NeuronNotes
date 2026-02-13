from rest_framework import serializers
from .model import (
    Project,
    Folder,
    Note,
    NoteLink,
    FollowLink

)

from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email']

class ProjectSerializer(serializers.ModelSerializer):
    owner= UserSerializer(read_only=True)
    class Meta:
        model = Project
        fields='__all__'


class ProjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields=['name','description','is_public']

class FolderSerializer(serializers.ModelSerializer):
    project= ProjectSerializer
    
    class Meta:
        model = Folder
        fields= "__all__"

class FolderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields= ['name','project','parent']

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields='__all__'
class NoteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note 
        fields=['name','content','folder']

class NoteLinkSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    note = NoteSerializer(read_only=True)
    folder= FolderSerializer(read_only=True)
    class Meta:
        model = NoteLink
        fields="__all__"

class NoteLinkCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteLink
        fields =['note','folder']

class FollowLinkSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    project= ProjectSerializer(read_only=True)
    class Meta:
        model=FollowLink
        fields="__all__"

class FollowLinkCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model= FollowLink
        fields = ['project']
        

