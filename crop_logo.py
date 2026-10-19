from PIL import Image
img = Image.open('public/logo.png').convert('RGBA')
bbox = img.getbbox()
if bbox:
    img_cropped = img.crop(bbox)
    img_cropped.save('public/logo.png', 'PNG')
    print('Cropped successfully to', bbox)
else:
    print('Empty image or bounding box not found')
