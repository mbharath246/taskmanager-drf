from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from drf_yasg.utils import swagger_auto_schema


from taskmanager.auth import get_token_user_id
from users.models import CustomUser
from users.serializers import CustomUserSerializers, PasswordRestSerializer


class UsersListView(APIView):
    queryset = CustomUser.objects
    serializer_class = CustomUserSerializers

    def get(self, request):
        user_id = get_token_user_id(self.request)
        print(user_id)
        if not user_id:
            return Response(data={"Message":"Invaid Token or Expried Token"}, status=status.HTTP_401_UNAUTHORIZED)

        user = self.queryset.get(pk=user_id)
        if not user.is_superuser:
            return Response(data={"Message":"You don't have accces to view all Users."}, status=status.HTTP_401_UNAUTHORIZED)
        data = self.queryset.all()
        serializer = CustomUserSerializers(data, many=True)
        return Response({'status':'success','code':status.HTTP_200_OK, "message":"all users data",'data':serializer.data,})
    

class UserCreateView(APIView):
    queryset = CustomUser.objects
    serializer_class = CustomUserSerializers
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(request_body=CustomUserSerializers)
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()  # This creates a new CustomUser instance
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserDetailView(APIView):
    queryset = CustomUser.objects
    serializer_class = CustomUserSerializers

    # @swagger_auto_schema(request_body=CustomUserSerializers)
    def get(self, request, pk=None):
        
        user_id = get_token_user_id(self.request)
        print(user_id)
        if not user_id:
            return Response(data={"Message":"Invaid Token or Expried Token"}, status=status.HTTP_401_UNAUTHORIZED)

        user = self.queryset.get(pk=user_id)
        if not user.is_superuser:
            return Response(data={"Message":"You don't have accces to view this User."}, status=status.HTTP_401_UNAUTHORIZED)

        instance = self.queryset.filter(pk=pk).first()
        if not instance:
            return Response({'message':"user doesn't exists",'status':status.HTTP_404_NOT_FOUND})
        serializer = self.serializer_class(instance, many=False)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    

    @swagger_auto_schema(request_body=CustomUserSerializers)
    def put(self, request, pk=None):

        user_id = get_token_user_id(self.request)
        print(user_id)
        if not user_id:
            return Response(data={"Message":"Invaid Token or Expried Token"}, status=status.HTTP_401_UNAUTHORIZED)

        user = self.queryset.get(pk=user_id)
        if not user.is_superuser:
            return Response(data={"Message":"You don't have accces to update this Users."}, status=status.HTTP_401_UNAUTHORIZED)

        instance = self.queryset.filter(pk=pk).first()
        if not instance:
            return Response({'message':"user doesn't exists",'status':status.HTTP_404_NOT_FOUND})
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(data=serializer.errors, status=status.HTTP_404_NOT_FOUND)
    


    def delete(self, request, pk=None):

        user_id = get_token_user_id(self.request)
        print(user_id)
        if not user_id:
            return Response(data={"Message":"Invaid Token or Expried Token"}, status=status.HTTP_401_UNAUTHORIZED)
        user = self.queryset.get(pk=user_id)

        if not user.is_superuser:
            return Response(data={"Message":"You don't have accces to delete this User."}, status=status.HTTP_401_UNAUTHORIZED)

        instance = self.queryset.filter(pk=pk)
        if instance:
            instance.delete()
            return Response({'message':"user deleted successfully",'status':status.HTTP_204_NO_CONTENT})
        return Response({'message':"user doesn't exists",'status':status.HTTP_404_NOT_FOUND})
    



class UserPasswordRestView(APIView):
    queryset = CustomUser.objects
    serializer_class = PasswordRestSerializer
    

    @swagger_auto_schema(request_body=PasswordRestSerializer)
    def put(self, request):

        user_id = get_token_user_id(self.request)
        print(user_id)
        if not user_id:
            return Response(data={"Message":"Invaid Token or Expried Token"}, status=status.HTTP_401_UNAUTHORIZED)
        
        new_password = request.data['new_password']
        obj = self.queryset.get(pk=user_id)
        obj.set_password(new_password)  
        obj.save()
        return Response({'success': 'password changed successfully'}, status=status.HTTP_200_OK)
