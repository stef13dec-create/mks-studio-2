import sys
from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    
    for item in data:
        r, g, b, a = item
        # Calculate luminance
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        
        # If it's lighter than dark gray, make it COMPLETELY transparent
        # Only keep the dark text and brown lines (which are quite dark)
        if lum > 150:
             new_data.append((r, g, b, 0))
        else:
             # Make the retained pixels fully opaque
             new_data.append((r, g, b, 255))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    process_image(sys.argv[1], sys.argv[2])
