from rest_framework import serializers
from rest_framework.reverse import reverse

from tasks.models import Tasks


class TasksSeralizer(serializers.ModelSerializer):
    task_date = serializers.DateTimeField(read_only=True)
    user = serializers.CharField(read_only=True)
    update = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = Tasks
        fields = [
            'id',
            'user',
            'name',
            'description',
            'status',
            'task_date',
            'update'
        ]

    def get_update(self, obj):
        request = self.context.get("request")
        if request is None:
            return None
        return reverse("task-detail", kwargs={"pk": obj.pk}, request=request)


class TaskSearchSerializer(serializers.Serializer):
    status_details = {
        'pending':'pending',
        'success':'success',
    }
    pk = serializers.IntegerField(read_only=True)
    status = serializers.ChoiceField(choices=status_details)
    name = serializers.CharField()
    description = serializers.CharField(read_only=True)
    task_date = serializers.CharField(read_only=True)