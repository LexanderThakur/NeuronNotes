from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class Project(models.Model):
    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    name= models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    is_public= models.BooleanField(default=True)
    created_at= models.DateTimeField(auto_now_add=True)

class Folder(models.Model):
    name= models.CharField(max_length=255)
    project = models.ForeignKey(Project,on_delete=models.CASCADE)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)


class Note(models.Model):
    name= models.CharField(max_length=255)
    content= models.TextField()
    folder = models.ForeignKey(Folder,null=True,blank=True,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)

class NoteLink(models.Model):
    owner= models.ForeignKey(User,on_delete=models.CASCADE)
    note= models.ForeignKey(Note,on_delete=models.CASCADE)
    folder = models.ForeignKey(Folder,on_delete= models.CASCADE)


class FollowLink(models.Model):
    user= models.ForeignKey(User,on_delete=models.CASCADE)
    project= models.ForeignKey(Project,on_delete=models.CASCADE)
    class Meta:
        unique_together = ('user', 'project')