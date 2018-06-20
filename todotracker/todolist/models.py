from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

# Create your models here.
class Status(models.Model):
    stname = models.CharField(max_length=50)

    def __str__(self):
        return "Status Group : {}".format(self.stname)


class TaskItem(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    status = models.ForeignKey(Status, related_name="tasks", on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=datetime.now(), blank=False)
    start_date = models.DateTimeField(blank=True, null=True)
    due_date = models.DateTimeField(blank=True, null=True)
    completed_date = models.DateTimeField(blank=True, null=True)
    archived = models.BooleanField(default=False, blank=False)

    def __str__(self):
        return "Task : {}".format(self.title)