from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.request import Request


from .serializers import StatusSerializer, TaskItemSerializer, EventSerializer
from .models import Status, TaskItem, Event


class StatusViewSet(ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    permission_classes = (permissions.IsAuthenticated,)


class TaskItemViewSet(ModelViewSet):
    #queryset = TaskItem.objects.all()
    #queryset = TaskItem.objects.filter(owner = self.response.user)
    serializer_class = TaskItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = TaskItem.objects.filter(owner = self.request.user.id)
        return queryset


class EventViewSet(ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Event.objects.filter(owner = self.request.user.id)
        return queryset

    def get_serializer_context(self):
        return {'request': self.request}    

        