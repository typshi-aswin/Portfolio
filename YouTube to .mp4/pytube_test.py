from pytube import YouTube
import os

url = input("Enter the YouTube URL: ")
download_path = os.path.join(os.path.expanduser('~'), 'Downloads')  # Downloads folder path

try:
    yt = YouTube(url)
    stream = yt.streams.get_highest_resolution()
    stream.download(output_path=download_path)  # Explicitly set the download path
    print(f"Downloaded: {yt.title} to {download_path}")
except Exception as e:
    print(f"Error: {e}")
