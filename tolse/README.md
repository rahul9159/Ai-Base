# Python image tools (`tolse`)

`image_tools.py` includes 17 tools matching your UI list:

1. Crop (`--crop left,top,right,bottom`)
2. Rotate (`--rotate deg`)
3. Resize (`--resize width,height`)
4. Filter (`--filter none|vintage|bw|warm|cool`)
5. Brightness (`--brightness 1.2`)
6. Contrast (`--contrast 1.2`)
7. Saturation (`--saturation 1.2`)
8. Temperature (`--temperature -100..100`)
9. Blur (`--blur radius`)
10. Healing Tool (`--heal x,y,r` repeat)
11. Brush (`--brush x,y,size,#RRGGBB` repeat)
12. Sharpen (`--sharpen 1.5`)
13. Text Tool (`--text`, `--text-pos`, `--text-size`, `--text-color`)
14. Background Remove (`--bg-remove 0..255`)
15. Clone Tool (`--clone sx,sy,w,h,dx,dy` repeat)
16. Exposure (`--exposure -2..2`)
17. Sticker / Overlay (`--sticker`, `--sticker-pos`, `--sticker-size`, `--sticker-opacity`)

## Install

```bash
pip install pillow
```

## Quick Start

`--input` and `--output` are required.

```bash
python3 image_tools.py --help

# Create a sample input image (for testing)
python3 - << 'PY'
from PIL import Image
Image.new("RGB", (800, 600), "#4f46e5").save("input.jpg")
print("created input.jpg")
PY

python3 image_tools.py \
  --input input.jpg \
  --output output.png \
  --filter warm
```

## Example

```bash
python3 image_tools.py \
  --input input.jpg \
  --output output.png \
  --crop 20,20,980,980 \
  --resize 1080,1080 \
  --filter warm \
  --brightness 1.1 \
  --contrast 1.1 \
  --saturation 1.2 \
  --temperature 25 \
  --blur 1.5 \
  --heal 320,260,25 \
  --brush 500,500,20,#ff0000 \
  --sharpen 1.4 \
  --text "My Caption" --text-pos 60,80 --text-color "#ffffff" \
  --bg-remove 28 \
  --clone 250,250,80,80,330,250 \
  --exposure 0.4 \
  --sticker "🔥" --sticker-pos 900,120 --sticker-size 60
```
