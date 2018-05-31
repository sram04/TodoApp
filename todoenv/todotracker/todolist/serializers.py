from rest_framework import serializers


from .models import Status, TaskItem


class TaskItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskItem
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):

    tasks = TaskItemSerializer(read_only=True, many=True)

    class Meta:
        model = Status
        fields = '__all__'





