from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault


from .models import Status, TaskItem, Event


class TaskItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskItem
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):

    #tasks = TaskItemSerializer(read_only=True, many=True)
    """ tasks = serializers.SerializerMethodField()

    archived = serializers.SerializerMethodField()

    def get_tasks(self, Status):
        user = self.context['request'].user
        queryset = TaskItem.objects.filter(owner = user.id, status = Status, archived = False, event = eventId)
        serializer = TaskItemSerializer(instance = queryset, many=True)
        return serializer.data

    def get_archived(self, Status):
        user = self.context['request'].user
        queryset = TaskItem.objects.filter(owner = user.id, status = Status, archived = True, event = eventId)
        serializer = TaskItemSerializer(instance = queryset, many=True)
        return serializer.data  """   

    class Meta:
        model = Status
        fields = '__all__'     


class EventSerializer(serializers.ModelSerializer):
    
    #status_list = Status.objects.all()
    
    status_list = serializers.SerializerMethodField()
    task_list = serializers.SerializerMethodField()
    archived_task_list = serializers.SerializerMethodField()

    def get_status_list(self, event):
        queryset = Status.objects.all()
        serializer = StatusSerializer(instance = queryset, many=True)
        return serializer.data

    def get_task_list(self, Event):
        #context = {'request' : self.context['request'], 'event' : Event}
        user = self.context['request'].user
        #eventId = self.context['event'].id
        queryset = TaskItem.objects.filter(owner = user.id, archived = False, event = Event)
        serializer = TaskItemSerializer(instance = queryset, many=True)
        return serializer.data

    def get_archived_task_list(self, Event):
        #context = {'request' : self.context['request'], 'event' : Event}
        user = self.context['request'].user
        #eventId = self.context['event'].id
        queryset = TaskItem.objects.filter(owner = user.id, archived = True, event = Event)
        serializer = TaskItemSerializer(instance = queryset, many=True)
        return serializer.data


    class Meta:
        model = Event
        fields = '__all__'







