import sys
from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    
    for item in data:
        r, g, b, a = item
        # Calculate luminance (perception-based)
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        
        # If it's pure white or very light gray, make it transparent
        if lum > 240:
             # Map 240-255 to alpha 255-0
             alpha = int(255 * (255 - lum) / 15.0)
             new_data.append((r, g, b, min(a, max(0, alpha))))
        else:
             new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    process_image(sys.argv[1], sys.argv[2])
