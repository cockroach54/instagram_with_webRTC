# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-06-28 13:09
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_auto_20170628_2117'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='relation',
            unique_together=set([('from_user', 'to_user')]),
        ),
    ]