from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

# Create your models here.
class Status(models.Model):
    stname = models.CharField(max_length=50)

    def __str__(self):
        return "Status Group : {}".format(self.stname)


class Event(models.Model):
    name = models.CharField(max_length=100)
    description =  models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "Event : {}".format(self.name)


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
    event = models.ForeignKey(Event, related_name="events", on_delete=models.CASCADE)


    def __str__(self):
        return "Task : {}".format(self.title)