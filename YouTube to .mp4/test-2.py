from pytubefix import YouTube
from pytubefix.cli import on_progress

url = "https://www.youtube.com/watch?v=5hPtU8Jbpg0"
yt = YouTube(url)
print(yt.title)

stream = yt.streams.get_highest_resolution()
stream.download()