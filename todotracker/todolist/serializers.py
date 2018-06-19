from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault


from .models import Status, TaskItem


class TaskItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskItem
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):

    #tasks = TaskItemSerializer(read_only=True, many=True)
    tasks = serializers.SerializerMethodField()

    archived = serializers.SerializerMethodField()

    def get_tasks(self, Status):
        user = self.context['request'].user
        queryset = TaskItem.objects.filter(owner = user.id, status = Status, archived = False)
        serializer = TaskItemSerializer(instance = queryset, many=True)
        return serializer.data

    def get_archived(self, Status):
        user = self.context['request'].user
        queryset = TaskItem.objects.filter(owner = user.id, status = Status, archived = True)
        serializer = TaskItemSerializer(instance = queryset, many=True)
        return serializer.data    

    class Meta:
        model = Status
        fields = '__all__'





