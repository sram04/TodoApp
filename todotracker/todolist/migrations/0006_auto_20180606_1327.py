# Generated by Django 2.0.5 on 2018-06-06 07:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0005_auto_20180601_1953'),
    ]

    operations = [
        migrations.AddField(
            model_name='taskitem',
            name='archived',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='taskitem',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2018, 6, 6, 13, 27, 31, 441311)),
        ),
    ]
