# Generated by Django 5.0.7 on 2024-07-19 16:35

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Success', 'Success')], default='Pending', max_length=10)),
                ('task_date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
