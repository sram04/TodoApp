from rest_framework.routers import DefaultRouter

from .api import StatusViewSet, TaskItemViewSet, EventViewSet

router = DefaultRouter()
router.register(r'status', StatusViewSet)
router.register(r'taskitems', TaskItemViewSet, 'taskitem-list')
router.register(r'events', EventViewSet, 'events-list')

urlpatterns = router.urls
