# Generated by Django 2.0.6 on 2018-06-14 12:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0006_auto_20180606_1327'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskitem',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2018, 6, 14, 18, 5, 3, 370778)),
        ),
    ]