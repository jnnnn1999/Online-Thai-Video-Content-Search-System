# Generated by Django 3.2.9 on 2022-03-06 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_alter_transcribe_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='youtube_id_db',
            field=models.CharField(default='Rrt3c9SCV08', max_length=100),
            preserve_default=False,
        ),
    ]
