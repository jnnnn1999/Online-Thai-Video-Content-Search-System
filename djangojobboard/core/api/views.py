from itertools import permutations
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from djangojobboard.core.models import File
from .serializers import FileSerializer, TranscribeSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

from core.transcribe import transcribe_video
from core.upload_video import youtube
from core.get_youtube_id import get_youtube_id
import pandas as pd
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from djangojobboard.core.models import Transcribe
from sqlalchemy import create_engine
from pytube import *
from rest_framework import  filters
from .permissions import IsVideoOwner


class FileListView(ListAPIView):
    permission_classes = [AllowAny,]
    serializer_class = FileSerializer

    def get_queryset(self):
        return File.objects.all()


class FileCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = FileSerializer

    def post(self,request, format=None):

        file_serializer = FileSerializer(data=request.data)
       
        if file_serializer.is_valid():
            file_serializer.save(user=self.request.user)
            file_path = file_serializer.data.get('youtube_website')

            video_file = youtube(file_path)
            # print(video_file)
            transcribe = transcribe_video(video_file)
            youtube_id = get_youtube_id(file_path)
            print(youtube_id)
            # file_serializer.create(youtube_id_db=youtube_id)
            

            # transcribe_file_id =file_serializer.data.get('id')

            df = pd.DataFrame(transcribe)

            print(df, "\n")
            df = df.transpose()
            df.columns = ['word', 'start_time', 'end_time']
            print("Transpose of above dataframe is-\n", df)
            df['start_time'] = df['start_time'].astype('timedelta64[s]')
            df['end_time'] = df['end_time'].astype('timedelta64[s]')

            print("Change Transpose of above dataframe is-\n", df)
            df.to_excel('Transcribe.xlsx', index =False)

            excel_files = 'Transcribe.xlsx'
            df = pd.read_excel(excel_files)
            print(df)
            df.index.names =['id']
            df = df.reset_index()
            # df['file_id'] =  transcribe_file_id
            df.to_excel('Transcribe_id.xlsx', index = False)

            excel_files2 = 'Transcribe_id.xlsx'
            df = pd.read_excel(excel_files2)
            engine = create_engine('postgresql://ZQRmDhZHfkCtPorHADcfiPLuWuJCdUNx:RRKzVDEVBcxnO9bVsYkwomgr9U9RBAIBaR21VbMVFIAiN5b2EddgbYsKJC4DUHfl@postgres:5432/djangojobboard')

           
            df.to_sql(Transcribe._meta.db_table,if_exists='append', con=engine, index=False)
            
            return Response(status=HTTP_200_OK)
        else:
            print(file_serializer.errors)
            return Response(file_serializer.errors, status=HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FileDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = FileSerializer

    def get_queryset(self):
        return File.objects.all()


class FileUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = FileSerializer

    def get_queryset(self):
        return File.objects.all()


class FileDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return File.objects.all()


class MyDataDetailfilter( ListAPIView):
    permission_classes = (AllowAny, )

    queryset = Transcribe.objects.all()
    serializer_class = TranscribeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^word']