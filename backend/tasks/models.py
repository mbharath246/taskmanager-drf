from django.db import models
from django.utils import timezone
from django.conf import settings

User =settings.AUTH_USER_MODEL

class Tasks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    status_details = {
        'Pending':'Pending',
        'Success':'Success',
    }
    status = models.CharField(max_length=10, default='Pending', choices=status_details)
    task_date = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return self.name