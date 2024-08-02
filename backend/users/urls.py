from django.urls import path
from users import views


urlpatterns = [
    path('list/',views.UsersListView.as_view(),name='users-list'),
    path('create/',views.UserCreateView.as_view(),name='users-create'),
    path('reset/',views.UserPasswordRestView.as_view(),name='users-reset'),
    path('<int:pk>/',views.UserDetailView.as_view(), name='user-detail'),
]
