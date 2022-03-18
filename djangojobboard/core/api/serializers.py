from rest_framework.serializers import ModelSerializer
from djangojobboard.core.models import File, Transcribe
from rest_framework import serializers


class FileSerializer(ModelSerializer):
    # is_owner = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = (
            "id",
            "title",
            "user",
            "youtube_website",
            "date_created",
            "youtube_id_db",
            # "is_owner",
        )
        read_only_fields = ("date_created","user")
    
    # def get_is_owner(self, obj):
       
    #     user = self.context.user
    #     return obj.user == user

class TranscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transcribe
        fields = ('word', 'start_time','end_time','file_id','id')


