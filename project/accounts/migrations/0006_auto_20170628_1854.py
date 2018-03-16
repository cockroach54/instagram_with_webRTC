# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-06-28 09:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20170628_1750'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='relation',
            name='updated_at',
        ),
        migrations.AlterField(
            model_name='profile',
            name='follow_set',
            field=models.ManyToManyField(blank=True, through='accounts.Relation', to='accounts.Profile'),
        ),
    ]
