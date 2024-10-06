import tkinter as tk

# Function to create a rounded rectangle on the canvas
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

# Create the main Tkinter window
root = tk.Tk()
root.title("Rounded Search Bar")
root.geometry("600x300")
root.config(bg='#1c1c1c')

# Create a canvas for drawing the rounded rectangle
canvas = tk.Canvas(root, width=400, height=50, bg='#1c1c1c', highlightthickness=0)
canvas.pack(pady=100)

# Draw the rounded rectangle (search bar background)
rounded_rect = create_rounded_rectangle(canvas, 10, 10, 390, 40, radius=20, fill='#555555')

# Create the search box (Entry widget) on top of the rounded rectangle
search_box = tk.Entry(root, width=42, borderwidth=0, bg='#333333', fg='white', font=('Arial', 14))
 # Position the search box inside the canvas

search_box.focus_set()  # Set focus to the search box when the window is opened

# Start the Tkinter main loop
root.mainloop()
