import datetime
from django.http import JsonResponse
from django.shortcuts import render
import json
import csv

from .form import CommentForm
from .models import Comment

def mainPage(request):
    # Opening JSON file
    allComment=Comment.objects.all()
    data={}
    data_read=[]
    with open("comment/static/csv/jva.csv") as fp:
        reader = csv.reader(fp, delimiter=",", quotechar='"')
        # next(reader, None)  # skip the headers
        data_read = [row for row in reader]

    with open('comment/static/json/data.json') as json_file:
        string = json.loads(json_file.read())
        data = json.loads(string)
    return render(request,'comment/main.html', locals())

def talkData(request):
        postHighlightText = request.POST.get("highlightText")
        postComment = request.POST.get("comment")
        lineNumber=request.POST.get("lineNumber")
        form=CommentForm(request.POST);
        if form.is_valid():
            form.save()
        print(datetime.datetime.now());
        return JsonResponse({'time':datetime.datetime.now()},status=200)
