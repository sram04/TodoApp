from django.contrib import admin


from .models import Status, TaskItem


admin.site.register(Status)
admin.site.register(TaskItem)

# Register your models here.
