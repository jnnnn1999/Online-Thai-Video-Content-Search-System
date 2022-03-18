# importing all the required modules
from django.shortcuts import render, redirect
from pytube import *
import os.path
 
 
# defining function
def youtube(link_path=None, url=None):
 
    # checking whether request.method is post or not
    if link_path:
       
        # getting link from frontend
        link = link_path
        video = YouTube(link)
 
        # setting video resolution
        stream = video.streams.get_lowest_resolution()
         
        # downloads video
        path =stream.download('./media')
        

        
      
    return path