from django.urls import path

from tasks import views


urlpatterns = [
    path('',views.TasksListView.as_view(),name='tasks-list'),
    path('<int:pk>/',views.TaskDetailView.as_view(), name='task-detail'),
    path('search/',views.TasksSearchView.as_view(), name='task-search')
]
