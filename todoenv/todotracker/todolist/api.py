from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.request import Request


from .serializers import StatusSerializer, TaskItemSerializer
from .models import Status, TaskItem


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


