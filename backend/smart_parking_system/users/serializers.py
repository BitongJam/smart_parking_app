from rest_framework import serializers
from .models import User,UserProfile
from rest_framework.exceptions import AuthenticationFailed

class UserListSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='profile.name')
    birthdate = serializers.DateField(source='profile.birthdate')


    class Meta:
        model = User
        fields = ['id','username','name','birthdate','email','active','is_admin']


class UserCreateSerializer(serializers.ModelSerializer):
    # Serializer for Creating New Users
    name = serializers.CharField(write_only=True)
    birthdate = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields= ['username','password','email','name','birthdate',]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self,validated_data):
        #get all data validate_data store on a variable to create it on the UserProfile Model
        name = validated_data.pop("name")
        birthdate= validated_data.pop("birthdate")
        email = validated_data.pop("email")

        user = User.objects.create_user(**validated_data)

        #Create UserProfile to store name birthdate,email
        UserProfile.objects.create(user_id=user,name=name,birthdate=birthdate,email=email)

        return user
    


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class ModifiedTokenObtainPairSerializer(TokenObtainPairSerializer):

    #create Custom TokenObtainPairSrializer to add checking if the user is active
    def validate(self, attrs):
        data = super().validate(attrs)

        if not self.user.active:
            raise serializers.ValidationError('User account is Deactivated.')

        return data