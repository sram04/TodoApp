from rest_framework.routers import DefaultRouter

from .api import StatusViewSet, TaskItemViewSet

router = DefaultRouter()
router.register(r'status', StatusViewSet)
router.register(r'taskitems', TaskItemViewSet, 'taskitem-list')

urlpatterns = router.urls
