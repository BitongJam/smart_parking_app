from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserListSerializer,UserCreateSerializer
from .models import User,UserProfile
from django.db import IntegrityError
from datetime import datetime


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    user = request.user
    return Response({
        "id":user.id,
        "username":user.username,
        "email":user.email,
        'is_admin':user.is_admin,
        'name' :user.profile.name,
        'birthdate':user.profile.birthdate
    })


@api_view(['GET'])
def get_list_users(request):
    #do not include the admin super user
    users = User.objects.exclude(id=1)
    serializer = UserListSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_user(request):
    serializer = UserCreateSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response({'message': 'User created successfully'}, status=201)
        except IntegrityError as e:
            return Response({'error':str(e)},status=409)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    return Response(serializer.errors, status=400)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_active_user(request,user_id):
    #Function for deactivating or re active users
    user = User.objects.get(id=user_id)
    activate_value = request.data.get("active")

    if not user:
        return Response({'error': 'User ID is required'}, status=400)
    
    user.active = activate_value
    user.save()

    return Response({'message': f'User {user.username} deactivated {user.active} successfully'}, status=200)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_current_user_details(request,user_id):
    # i did not include password for this
    user = User.objects.get(id=user_id)
    name = request.data.get("name")
    birthdate = request.data.get("birthdate")
    username = request.data.get("username")
    email = request.data.get("email")
    user_profile = UserProfile.objects.get(user_id=user_id)
    print("fullname: "+ str(user_profile))
    user_profile.name = name
    user_profile.birthdate = datetime.strptime(birthdate, "%Y-%m-%d").date()
    user.username = username
    user.email = email

    user_profile.save()
    user.save()
    return Response({'message': f'User {user.username} Details Updated Successfully'}, status=200)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_user_password(request,user_id):
    # update only password
    user = User.objects.get(id=user_id)
    password = request.data.get("password")
    user.set_password(password) 
    user.save()
    return Response({'message': f'User {user.username} Details Updated Successfully'}, status=200)


from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import ModifiedTokenObtainPairSerializer

class ModifiedTokenObtainPairView(TokenObtainPairView):
    serializer_class = ModifiedTokenObtainPairSerializer