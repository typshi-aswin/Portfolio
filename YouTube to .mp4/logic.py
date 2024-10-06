from pytubefix import YouTube

def get_available_streams(url):
    try:
        yt = YouTube(url)

        # Use a set to collect unique streams based on resolution
        unique_resolutions = set()

        streams = (
            list(yt.streams.filter(res="360p")) +
            list(yt.streams.filter(res="480p")) +
            list(yt.streams.filter(res="720p")) +
            list(yt.streams.filter(res="1080p"))
        )

        available_streams = []
        for stream in streams:
            if stream.resolution not in unique_resolutions:
                unique_resolutions.add(stream.resolution)
                available_streams.append((stream.resolution, stream))

        return available_streams
    except Exception as e:
        print(f"Error retrieving streams: {e}")
        return []

