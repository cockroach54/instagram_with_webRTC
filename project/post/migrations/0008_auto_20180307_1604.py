# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-03-07 07:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0007_auto_20180307_1535'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='movie',
            field=models.CharField(max_length=100),
        ),
    ]
