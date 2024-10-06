from pytubefix import YouTube

def funct(): 

   try:
     yt = YouTube('https://www.youtube.com/watch?v=5hPtU8Jbpg0')
     stream = yt.streams.all()
     
     print(f"Downloaded: {stream}")
   except Exception as e:
        print(f"Error downloading video: {e}")

funct()