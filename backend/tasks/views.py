from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from tasks.serializers import TaskSearchSerializer, Tasks, TasksSeralizer
from taskmanager.auth import get_token_user_id


class TasksListView(APIView):
    """
    API view to list all tasks for the authenticated user.
    """
    serializer_class = TasksSeralizer
    
    def get_queryset(self, user_id):
        return Tasks.objects.filter(user=user_id).order_by('-task_date')


    def get(self, request):
        """
        Handles GET requests to retrieve tasks for the authenticated user.
        
        :param request: The HTTP request object.
        :return: A Response object containing the tasks data or an error message.
        """
        try:
            user_id = get_token_user_id(self.request)
            if not user_id:
                return Response(
                    data={"Message": "Invalid Token or Expired Token"}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            instance = self.get_queryset(user_id)
            if not instance.exists():
                return Response(
                    data={"message": "You have no tasks to do."}, 
                    status=status.HTTP_200_OK
                )
        
            serializer = self.serializer_class(instance, many=True, context={'request': request})
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                data={'Message': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
    
    @swagger_auto_schema(request_body=TasksSeralizer)
    def post(self, request):
        """
        Handles POST requests to create a new task for the authenticated user.
        
        **Request Data**:
        
        - The data should be in JSON format and include fields required by the `TasksSeralizer`.
        

        :param request: The HTTP request object containing the task data.
        :return: A Response object containing either the created task data or error details.
        """
        user_id = get_token_user_id(self.request)
        print(user_id)
        if not user_id:
            return Response(data={"Message":"Invaid Token or Expried Token"}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(data=serializer.data, status= status.HTTP_201_CREATED)
        return Response(data = serializer.errors, status=status.HTTP_404_NOT_FOUND)
    

class TaskDetailView(APIView):
    queryset = Tasks.objects
    serializer_class = TasksSeralizer


    def get(self, request, pk):
        """
        Handles GET requests to retrieve a specific task.

        **Parameters**:
        - **request**: The HTTP request object.
        - **pk**: The primary key of the task to retrieve.

        :param request: The HTTP request object.
        :param pk: The primary key of the task to retrieve.
        :return: A Response object with the task data or error message.
        """
        try:
            user_id = get_token_user_id(self.request)
            print(user_id)
            if not user_id:
                return Response(data={"Message":"Invaid Token or Expried Token"}, status=status.HTTP_401_UNAUTHORIZED)
            
            instance = self.queryset.filter(pk=pk, user=user_id).first()
            if not instance:
                return Response(data={'Message':"Entered Task Doesn't Exists"}, status=status.HTTP_404_NOT_FOUND)
        except Tasks.DoesNotExist:
            return Response(data={'Message':'Tasks Doesnot exists'})
        
        serializer = self.serializer_class(instance, many=False)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    

    @swagger_auto_schema(request_body=TasksSeralizer)
    def put(self, request, pk):
        """
        Handles PUT requests to update a specific task.

        **Parameters**:
        - **request**: The HTTP request object containing the updated task data.
        - **pk**: The primary key of the task to update.


        :param request: The HTTP request object.
        :param pk: The primary key of the task to update.
        :return: A Response object indicating the result of the update operation.
        """
        user_id = get_token_user_id(self.request)
        print(user_id)
        if not user_id:
            return Response(data={"Message":"Invaid Token or Expried Token"}, status=status.HTTP_401_UNAUTHORIZED)

        instance = self.queryset.filter(pk=pk, user=user_id).first()
        if not instance:
            return Response(data={'Message':"No tasks is avaliable to update."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={'Message':'Task Updated Successfully'}, status=status.HTTP_202_ACCEPTED)
        return Response(data=serializer.errors, status=status.HTTP_404_NOT_FOUND)
    


    def delete(self, request, pk):
        """
        Handles DELETE requests to remove a specific task.

        **Parameters**:
        - **request**: The HTTP request object.
        - **pk**: The primary key of the task to delete.

        :param request: The HTTP request object.
        :param pk: The primary key of the task to delete.
        :return: A Response object indicating the result of the delete operation.
        """
        user_id = get_token_user_id(self.request)
        print(user_id)
        if not user_id:
            return Response(data={"Message":"Invaid Token or Expried Token"}, status=status.HTTP_401_UNAUTHORIZED)
    
        instance = self.queryset.filter(pk=pk, user=user_id).first()
        if not instance:
            return Response(data={'Message':"No Task is present to delete"}, status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        return Response(data={'Message':'Task Deleted Successfully'}, status=status.HTTP_204_NO_CONTENT)
    

class TasksSearchView(APIView):
    queryset = Tasks.objects
    serializer_class = TaskSearchSerializer


    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'status', 
                openapi.IN_QUERY, 
                description="Filter by status", 
                type=openapi.TYPE_STRING, 
                enum=['Pending', 'Success']
            ),
            openapi.Parameter('name', openapi.IN_QUERY, description="Filter by name", type=openapi.TYPE_STRING),
        ]
    )
    def get(self, request):

        """
        Handles GET requests to search for tasks based on query parameters.

        **Parameters**:
        - **request**: The HTTP request object containing query parameters for filtering tasks.

        **Query Parameters**:
        - **status**: Optional. Filters tasks by their status.
        - **name**: Optional. Filters tasks by their name.

        :param request: The HTTP request object containing query parameters.
        :return: A Response object with the count and data of the matching tasks or an error message.
        """
        
        user_id = get_token_user_id(self.request)
        print(user_id)
        if not user_id:
            return Response(data={"Message":"Invaid Token or Expried Token"}, status=status.HTTP_401_UNAUTHORIZED)

        status_detail = request.query_params.get('status')
        name = request.query_params.get('name')
        queryset = self.queryset.filter(user=user_id).order_by('-task_date')

        if status_detail:
            queryset = queryset.filter(status__icontains=status_detail)
        
        if name:
            queryset = queryset.filter(name__icontains=name)
        
        serializer = self.serializer_class(queryset, many=True)
        data = {
            'count': queryset.count(),
            'data': serializer.data
        }        
        return Response(data=data, status=status.HTTP_200_OK)