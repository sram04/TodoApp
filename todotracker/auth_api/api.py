from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.viewsets import ModelViewSet

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
        email = request.data.get("emailaddress")
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


class FindUsers(views.APIView):

    def get(self, request):
        email = request.GET.get("emailaddress")
        userDetails = User.objects.filter(email = email)

        if(len(userDetails) == 0):
            return Response({
                'status' : 'user not found',
                'message' : 'unable to find any user registered with {0}'.format(email)
            }, status=status.HTTP_404_NOT_FOUND)

        else:
            user = userDetails[0]
            return Response(UserSerializer(user).data)


class ChangePasswordView(views.APIView):

    def post(self, request):
        #username = request.data.get("username")
        currpassword = request.data.get("currPassword")
        newPassword = request.data.get("newPassword")

        user = request.user

        #check the availability of the user
        if(user is None):
            return Response({
                'status' : 'user not found',
                'message' : 'unable to find the current user',
            }, status=status.HTTP_404_NOT_FOUND)

        #check current password
        if (user.check_password(currpassword)):           
            if(currpassword == newPassword):
                return Response({
                    'status' : 'Both passwords are the same',
                    'message' : 'New Password is same as the current password. No changes made!',
                }, status=status.HTTP_400_BAD_REQUEST) 

            user.set_password(newPassword)
            user.save()
            return Response(UserSerializer(user).data)            
        else:
            #invalid current password
            return Response({
                'status' : 'Invalid current password',
                'message' : 'Invalid current password. Please enter your current password!',
            }, status=status.HTTP_400_BAD_REQUEST)
