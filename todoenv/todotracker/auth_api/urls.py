from django.conf.urls import url


from .api import LoginView, LogoutView, RegisterView, FindUsers, ChangePasswordView


urlpatterns = [
    url(r'login/', LoginView.as_view()),
    url(r'logout/', LogoutView.as_view()),
    url(r'register/', RegisterView.as_view()),
    url(r'changePassword/', ChangePasswordView.as_view()),
    url(r'^findUser/', FindUsers.as_view()),
]