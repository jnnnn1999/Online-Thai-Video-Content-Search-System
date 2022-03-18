import os
import subprocess
from django.http import HttpResponse
from django.shortcuts import render,redirect
from django.conf import settings
import moviepy.editor as mp

execution_path = settings.MEDIA_ROOT

def transcribe_video(video_file=None, url=None):

    #保存PATH
    source = "./media/" 

    #GCS_URL
    GCS_BASE = "gs://stt-media-files/"    

    #結果保存
    speech_result = []
    speech_result2 = []
    word = []
    start_time =[]
    end_time = []

    if video_file:
        #GoogleStorageの環境準備
        from google.cloud import storage
        storage.blob._DEFAULT_CHUNKSIZE = 5 * 1024* 1024  # 5 MB
        storage.blob._MAX_MULTIPART_SIZE = 5 * 1024* 1024  # 5 MB
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"]='CloudDemo_JT_service.json'
        client = storage.Client()
        bucket = client.get_bucket('stt-media-files', timeout=None)

        # transcribe_file = file_path
        # name, ext = os.path.splitext(transcribe_file)

        transcribe_path = os.path.split(video_file)
        transcribe_file = transcribe_path[1]
        name, ext = os.path.splitext(transcribe_file)

        if ext==".wav": 
            #GoogleStorageへアップロード
            blob = bucket.blob( transcribe_file )
            blob.upload_from_filename(filename= source + transcribe_file )

            #再生時間を取得
            # from pydub import AudioSegment
            # sound = AudioSegment.from_file( source + transcribe_file )
            # length = sound.duration_seconds
            # length += 1


            #作業用ファイルの削除
            # cmd = 'rm -f ' + source + transcribe_file     
            # subprocess.call(cmd, shell=True)

            #文字起こし
            from google.cloud import speech

            client = speech.SpeechClient()

            gcs_uri = GCS_BASE + transcribe_file

            audio = speech.RecognitionAudio(uri=gcs_uri)
            config = speech.RecognitionConfig(
                encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
                #sample_rate_hertz=16000,
                language_code="th-TH",
                enable_word_time_offsets=True,
                audio_channel_count=1,
            )

            operation = client.long_running_recognize(config=config, audio=audio)

            response = operation.result(timeout=10000)

            for result in response.results:
                alternative = result.alternatives[0]
                speech_result += {alternative.transcript}
                speech_result2 += {alternative.confidence}
                for word_info in alternative.words:
                    word += {word_info.word}
                    start_time += {word_info.start_time}
                    end_time += {word_info.end_time}

                    # speech_result2  += {"Word": {word}, "start_time": {start_time.total_seconds()}, "end_time": {end_time.total_seconds()}}


            #GoogleStorageのファイル削除
            blob.delete()

        else:
            #ファイルの変換処理
            f_input = source + transcribe_file
            f_output = source + name + ".wav"
            upload_file_name = name + ".wav"
            # cmd = 'ffmpeg -i ' + f_input + ' -ar 16000 -ac 1 ' + f_output
            my_clip = mp.VideoFileClip(f_input)
            # subprocess.call(cmd, shell=True)
            my_clip.audio.write_audiofile(f_output )
            #GoogleStorageへアップロード
            blob = bucket.blob( upload_file_name )
            blob.upload_from_filename(filename= f_output )

            #再生時間を取得
            # from pydub import AudioSegment
            # sound = AudioSegment.from_file( source + transcribe_file )
            # length = sound.duration_seconds
            # length += 1


            #作業用ファイルの削除
            # cmd = 'rm -f ' + f_input + ' ' + f_output     
            # subprocess.call(cmd, shell=True)

            #文字起こし
            from google.cloud import speech

            client = speech.SpeechClient()

            gcs_uri = GCS_BASE + upload_file_name

            audio = speech.RecognitionAudio(uri=gcs_uri)
            config = speech.RecognitionConfig(
                encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
                #sample_rate_hertz=16000,
                language_code="th-TH",
                enable_word_time_offsets=True,
                audio_channel_count=2,
            )

            operation = client.long_running_recognize(config=config, audio=audio)

            response = operation.result(timeout=10000)

            for result in response.results:
                alternative = result.alternatives[0]
                speech_result += {alternative.transcript}
                speech_result2 += {alternative.confidence}

                for word_info in alternative.words:
                    word += {word_info.word}
                    start_time += {word_info.start_time}
                    end_time += {word_info.end_time}
               


            #GoogleStorageのファイル削除
            blob.delete()
    else:
        pass
    return [word,start_time,end_time]

