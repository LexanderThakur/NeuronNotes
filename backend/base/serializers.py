from rest_framework import serializers
from .models import (
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
    project = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Folder
        fields= "__all__"

class FolderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields= ['name','project','parent']
        extra_kwargs = {
            'project': {'required': False}
        }

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
    def validate(self,data):
        user=self.context['request'].user 
        project = data["project"]
        if FollowLink.objects.filter(user=user, project=project).exists():
            raise serializers.ValidationError("Already following.")
        return data 
    def create(self,validated_data):
        return FollowLink.objects.create(
            user=self.context['request'].user,
            **validated_data
        )

class NoteMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "name", "folder", "created_at"]
