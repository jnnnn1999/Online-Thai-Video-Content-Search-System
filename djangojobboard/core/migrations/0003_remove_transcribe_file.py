# Generated by Django 3.2.9 on 2022-03-06 02:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_transcribe_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transcribe',
            name='file',
        ),
    ]
