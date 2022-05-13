from django.db import models
class Comment(models.Model):
    highlightText=models.TextField('highlightText',default='');
    comment=models.TextField('comment',default='');
    lineNumber=models.IntegerField('lineNumber',default=0);
