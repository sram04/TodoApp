from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions


from .serializers import StatusSerializer, TaskItemSerializer
from .models import Status, TaskItem


class StatusViewSet(ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    permission_classes = (permissions.IsAuthenticated,)


class TaskItemViewSet(ModelViewSet):
    queryset = TaskItem.objects.all()
    serializer_class = TaskItemSerializer
    permission_classes = (permissions.IsAuthenticated,)


