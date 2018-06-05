from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

from rest_framework import status, views
from rest_framework.response import Response

from .serializers import UserSerializer

class LoginView(views.APIView):

    @method_decorator(csrf_protect)
    def post(self, request):
        user = authenticate(
            username = request.data.get("username"),
            password = request.data.get("password"))

        if user is None or not user.is_active:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username or password incorrect'
            }, status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)
        return Response(UserSerializer(user).data)


class LogoutView(views.APIView):

    def get(self, request):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class RegisterView(views.APIView):

    def post(self, request):
        
        newUsername = request.data.get("username")
        currentUsers = User.objects.filter(username = newUsername)
        
        if len(currentUsers) > 0:
            return Response({
                'status': 'Unauthorized',
                'message': 'username - {0} is already taken'.format(newUsername)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
        user = User.objects.create_user(
                username = newUsername,
                email = request.data.get("emailaddress"),
                password = request.data.get("password"))
        

        return Response(UserSerializer(user).data)    
