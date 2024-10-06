import tkinter as tk
import tkinter.font as tkFont
import logic
from ctypes import windll
import threading



def main():
    root = tk.Tk()
    root.title("Youtube Video Converter")
    root.geometry("500x400")
    root.config(bg='#000000')
    root.resizable(False, False)

    root.tk.call('tk', 'scaling', 2)
    windll.shcore.SetProcessDpiAwareness(1)
    title_label = tk.Label(root, text="YouTube Video Converter", bg='#000000', fg='white', font=('Segoe UI', 15, 'bold'))
    title_label.pack(pady=(50, 0))

   


    def create_rounded_rectangle(canvas, x1, y1, x2, y2, radius=25, **kwargs):
        points = [x1+radius, y1, x1+radius, y1,
              x2-radius, y1, x2-radius, y1,
              x2, y1, x2, y1+radius,
              x2, y2-radius, x2, y2-radius,
              x2, y2, x2-radius, y2,
              x1+radius, y2, x1+radius, y2,
              x1, y2, x1, y2-radius,
              x1, y1+radius, x1, y1+radius, x1, y1]
        return canvas.create_polygon(points, smooth=True, **kwargs)

   # Create a canvas for drawing the rounded rectangle
    canvas = tk.Canvas(root, width=400, height=50, bg='#1c1c1c', highlightthickness=0)
    canvas.pack(pady=30)

# Draw the rounded rectangle (search bar background)
    rounded_rect = create_rounded_rectangle(canvas, 10, 10, 390, 40, radius=20, fill='#555555')

# Create the search box (Entry widget) on top of the rounded rectangle
    search_box = tk.Entry(root, width=28, borderwidth=0, bg='#555555', fg='white', font=('Helvetica', 11))
 # Position the search box inside the canvas
    search_box_window = canvas.create_window(200, 24, window=search_box)  # Position the search box inside the canvas

    search_box.focus_set()  # Set focus to the search box when the window is opened

     

# Create a frame for displaying stream options
    stream_frame = tk.Frame(root, bg='#000000')
    stream_frame.pack(pady=(1, 0))


    def display_streams(streams):
    # Clear previous streams
     for widget in stream_frame.winfo_children():
        widget.destroy()

    # Create a new frame for the stream buttons
     stream_button_frame = tk.Frame(stream_frame, bg='#000000')
     stream_button_frame.pack(pady=(15, 0))

    # Create a label for download status
     download_status = tk.Label(stream_frame, text="", bg='#000000', fg='white', font=('Arial', 12))
     download_status.pack(pady=(25, 0))

    # Create buttons for each stream resolution
     for resolution, stream in streams:
        stream_button = tk.Button(
            stream_button_frame, 
            text=resolution, 
            bg='#2e2a29', 
            fg='white', 
            font=('Arial', 9, 'bold'),
            command=lambda s=stream: download_stream(s, download_status)  # Pass stream to the download function
        )
        stream_button.pack(side=tk.LEFT, padx=7)  # Pack side by side with some padding


    def download_stream(stream, download_status):
     def download():
        try:
            # Download the selected stream
            stream.download()  # Downloads to the current working directory
            download_status.config(text="Downloaded.")  # Update the status label
            search_box.delete(0, tk.END)  # Clear the search box after download

            # Delay before clearing the buttons to show the "Downloaded" message
            root.after(2000, clear_buttons)  # Wait for 2 seconds before clearing buttons

        except Exception as e:
            download_status.config(text=f"Error: {e}")  # Update the status with error

     def clear_buttons():
        # Clear all stream buttons
        for widget in stream_frame.winfo_children():
            widget.destroy()

    # Start the download in a new thread
     threading.Thread(target=download).start()



    def on_enter(event):
        url = search_box.get()
        streams = logic.get_available_streams(url)
        display_streams(streams)

    # Bind the "Enter" key to the search box to trigger download when pressed
    search_box.bind('<Return>', on_enter)

   
  
    root.mainloop()

if __name__ == "__main__":
    main()
