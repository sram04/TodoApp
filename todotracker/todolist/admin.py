from django.contrib import admin


from .models import Status, TaskItem, Event


admin.site.register(Status)
admin.site.register(TaskItem)
admin.site.register(Event)

# Register your models here.
