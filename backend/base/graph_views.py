from rest_framework.decorators import api_view

from rest_framework.response import Response



from .models import ( 
    Project,
    Folder,
    Note,
   
)

import random
import math 
@api_view(["GET"])
def graph(request, project_id):

    obj = Project.objects.get(id=project_id)

    folder_qs = list(
        Folder.objects.filter(project=obj)
    )

    note_qs =list( Note.objects.filter(project=obj))

    folder_qs.sort(key=lambda x: x.id)

    data = []
    note_data = []
    hm = {}
    links = []
    for folder in folder_qs:


        depth = 0
        temp = folder.parent

        while temp is not None:
            depth += 1
            temp = temp.parent

        radius = max(120, 800 / (depth + 1))
        jitter = max(0.02, 0.2 / (depth + 1))
        siblings = []

        for folder2 in folder_qs:
            if folder2.parent == folder.parent:
                siblings.append(folder2)

        root_count = len(siblings)

        sibling_index = siblings.index(folder)

        cx = 0 if folder.parent is None else hm[("folder", folder.parent.id)][0]
        cy = 0 if folder.parent is None else hm[("folder", folder.parent.id)][1]

        angle = (
                    2 * math.pi * sibling_index / root_count
                    + random.uniform(-jitter, jitter)
                )
        x = cx + radius * math.cos(angle)
        y = cy + radius * math.sin(angle)


        if folder.parent != None:
            links.append({
                "from_x":cx,
                "from_y":cy,
                "to_x":x,
                "to_y":y
            })
        data.append({
            "id": folder.id,
            "x": x,
            "y": y,
            "name":folder.name
        })
        

        hm[("folder", folder.id)] = (x, y)
    
    for i in range(len(note_qs)):
        note =  note_qs[i]
        depth = 0
        temp= note.folder
        while temp is not None:
            depth+=1
            temp=temp.parent

        radius = 340 + depth * 20 if note.folder is not None else random.randint(1200,1500)
        jitter = max(0.02, 0.2 / (depth + 1))
        siblings = []
        for n in note_qs:
            if n.folder==note.folder:
                siblings.append(n)

        root_count = len(siblings)
        sibling_index= siblings.index(note)

        cx = 0 if note.folder is None else hm[("folder", note.folder.id)][0]
        cy = 0 if note.folder is None else hm[("folder", note.folder.id)][1]
        start_angle = -math.pi / 3
        end_angle = math.pi / 3

        if root_count == 1:
            angle = 0
        else:
            angle = start_angle + (
                (end_angle - start_angle)
                * sibling_index
                / (root_count - 1)
            )

        angle +=  random.randint(60,120) +random.uniform(-jitter, jitter) 
        x = cx + radius * math.cos(angle) 
        y = cy + radius * math.sin(angle)  
        if note.folder != None:
            links.append({
                "from_x":cx,
                "from_y":cy,
                "to_x":x,
                "to_y":y
            })
        note_data.append({
            "id":note.id,
            "x":x,
            "y":y,
            "name":note.name
        })
        hm[("note", note.id)] = (x, y)
    return Response({"message": data,"links":links,"note_data":note_data}, status=200)