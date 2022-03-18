from django.db import models
from djangojobboard.users.models import User


class File(models.Model):
    title = models.CharField(max_length=100)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="files")
    youtube_website = models.URLField()
    youtube_id_db = models.CharField(max_length=100)

    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title


class Transcribe(models.Model):
    file = models.ForeignKey(File, on_delete=models.CASCADE,null=True)
    # file = models.OneToOneField(File, on_delete=models.CASCADE)
    word = models.CharField(max_length=255)
    start_time = models.CharField(max_length=255)
    end_time = models.CharField(max_length=255)


    def __unicode__(self):
        return "%s's profile" % self.Word