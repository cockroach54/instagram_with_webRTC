# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-06-29 04:21
from __future__ import unicode_literals

import accounts.models
from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_auto_20170628_2209'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='picture',
            field=imagekit.models.fields.ProcessedImageField(blank=True, upload_to=accounts.models.user_path),
        ),
    ]
