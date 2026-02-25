#!/usr/bin/env python3
"""Image editing CLI with 17 tools.

Tools:
1) Crop
2) Rotate
3) Resize
4) Filter
5) Brightness
6) Contrast
7) Saturation
8) Temperature
9) Blur
10) Healing
11) Brush
12) Sharpen
13) Text
14) Background Remove
15) Clone
16) Exposure
17) Sticker / Overlay
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps, UnidentifiedImageError


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def parse_ints(raw: str, count: int, sep: str = ",") -> list[int]:
    items = [x.strip() for x in raw.split(sep)]
    if len(items) != count:
        raise ValueError(f"Expected {count} values, got {len(items)}: {raw}")
    return [int(float(v)) for v in items]


def apply_filter_preset(img: Image.Image, preset: str) -> Image.Image:
    if preset == "none":
        return img
    if preset == "bw":
        return ImageOps.grayscale(img).convert("RGBA")
    if preset == "vintage":
        gray = ImageOps.grayscale(img)
        return ImageOps.colorize(gray, "#704214", "#e5c07b").convert("RGBA")
    if preset == "warm":
        r, g, b, a = img.split()
        r = r.point(lambda x: int(clamp(x * 1.08, 0, 255)))
        b = b.point(lambda x: int(clamp(x * 0.95, 0, 255)))
        return Image.merge("RGBA", (r, g, b, a))
    if preset == "cool":
        r, g, b, a = img.split()
        r = r.point(lambda x: int(clamp(x * 0.95, 0, 255)))
        b = b.point(lambda x: int(clamp(x * 1.08, 0, 255)))
        return Image.merge("RGBA", (r, g, b, a))
    return img


def apply_temperature(img: Image.Image, temp: int) -> Image.Image:
    temp = int(clamp(temp, -100, 100))
    if temp == 0:
        return img
    r, g, b, a = img.split()
    scale = abs(temp) / 100.0
    if temp > 0:
        r = r.point(lambda x: int(clamp(x + 35 * scale, 0, 255)))
        b = b.point(lambda x: int(clamp(x - 20 * scale, 0, 255)))
    else:
        b = b.point(lambda x: int(clamp(x + 35 * scale, 0, 255)))
        r = r.point(lambda x: int(clamp(x - 20 * scale, 0, 255)))
    return Image.merge("RGBA", (r, g, b, a))


def apply_healing(img: Image.Image, heals: Iterable[str]) -> Image.Image:
    if not heals:
        return img

    out = img.copy()
    blurred = img.filter(ImageFilter.GaussianBlur(radius=6))

    for heal in heals:
        x, y, radius = parse_ints(heal, 3)
        box = (x - radius, y - radius, x + radius, y + radius)
        patch = blurred.crop(box)

        mask = Image.new("L", patch.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, patch.size[0], patch.size[1]), fill=200)

        out.paste(patch, box, mask)

    return out


def apply_brush(img: Image.Image, brushes: Iterable[str]) -> Image.Image:
    if not brushes:
        return img

    out = img.copy()
    draw = ImageDraw.Draw(out, "RGBA")

    for brush in brushes:
        # x,y,size,color  -> e.g. 120,140,20,#ff0000
        parts = [p.strip() for p in brush.split(",")]
        if len(parts) != 4:
            raise ValueError(f"Invalid --brush value: {brush}")
        x = int(float(parts[0]))
        y = int(float(parts[1]))
        size = int(float(parts[2]))
        color = parts[3]
        draw.ellipse((x - size, y - size, x + size, y + size), fill=color)

    return out


def apply_text(img: Image.Image, text: str, x: int, y: int, size: int, color: str) -> Image.Image:
    if not text:
        return img

    out = img.copy()
    draw = ImageDraw.Draw(out, "RGBA")
    font = ImageFont.load_default()
    draw.text((x, y), text, fill=color, font=font)

    if size > 14:
        # Default bitmap font is fixed; emulate larger text by second-pass scale.
        layer = Image.new("RGBA", out.size, (0, 0, 0, 0))
        d2 = ImageDraw.Draw(layer, "RGBA")
        d2.text((x, y), text, fill=color, font=font)
        scaled = layer.resize((int(out.width * (size / 14.0)), int(out.height * (size / 14.0))), Image.Resampling.BICUBIC)
        scaled = scaled.crop((0, 0, out.width, out.height))
        out.alpha_composite(scaled)

    return out


def apply_bg_remove(img: Image.Image, threshold: int) -> Image.Image:
    threshold = int(clamp(threshold, 0, 255))
    if threshold <= 0:
        return img

    out = img.copy()
    px = out.load()

    for y in range(out.height):
        for x in range(out.width):
            r, g, b, a = px[x, y]
            # Remove near-white background pixels.
            if r > 200 and g > 200 and b > 200 and (255 - r + 255 - g + 255 - b) < threshold:
                px[x, y] = (r, g, b, 0)

    return out


def apply_clone(img: Image.Image, clones: Iterable[str]) -> Image.Image:
    if not clones:
        return img

    out = img.copy()
    for clone in clones:
        # sx,sy,w,h,dx,dy
        sx, sy, w, h, dx, dy = parse_ints(clone, 6)
        patch = out.crop((sx, sy, sx + w, sy + h))
        out.paste(patch, (dx, dy), patch)

    return out


def apply_sticker(img: Image.Image, sticker_text: str, x: int, y: int, size: int, opacity: int) -> Image.Image:
    if not sticker_text:
        return img

    out = img.copy()
    alpha = int(clamp(opacity, 0, 100) * 2.55)
    layer = Image.new("RGBA", out.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    font = ImageFont.load_default()
    draw.text((x, y), sticker_text, fill=(255, 255, 255, alpha), font=font)

    if size > 14:
        layer = layer.resize((int(out.width * (size / 14.0)), int(out.height * (size / 14.0))), Image.Resampling.BICUBIC)
        layer = layer.crop((0, 0, out.width, out.height))

    out.alpha_composite(layer)
    return out


def main() -> None:
    parser = argparse.ArgumentParser(description="Image editor with 17 tools")
    parser.add_argument("--input", required=True, help="Input image path")
    parser.add_argument("--output", required=True, help="Output image path")

    # 1 Crop
    parser.add_argument("--crop", default="", help="left,top,right,bottom")
    # 2 Rotate
    parser.add_argument("--rotate", type=float, default=0.0)
    # 3 Resize
    parser.add_argument("--resize", default="", help="width,height")
    # 4 Filter
    parser.add_argument("--filter", default="none", choices=["none", "vintage", "bw", "warm", "cool"])
    # 5 Brightness
    parser.add_argument("--brightness", type=float, default=1.0)
    # 6 Contrast
    parser.add_argument("--contrast", type=float, default=1.0)
    # 7 Saturation
    parser.add_argument("--saturation", type=float, default=1.0)
    # 8 Temperature
    parser.add_argument("--temperature", type=int, default=0)
    # 9 Blur
    parser.add_argument("--blur", type=float, default=0.0)
    # 10 Healing
    parser.add_argument("--heal", action="append", default=[], help="x,y,r (repeatable)")
    # 11 Brush
    parser.add_argument("--brush", action="append", default=[], help="x,y,size,color (repeatable)")
    # 12 Sharpen
    parser.add_argument("--sharpen", type=float, default=1.0)
    # 13 Text
    parser.add_argument("--text", default="")
    parser.add_argument("--text-pos", default="40,40", help="x,y")
    parser.add_argument("--text-size", type=int, default=14)
    parser.add_argument("--text-color", default="#ffffff")
    # 14 Background Remove
    parser.add_argument("--bg-remove", type=int, default=0, help="0-255")
    # 15 Clone
    parser.add_argument("--clone", action="append", default=[], help="sx,sy,w,h,dx,dy (repeatable)")
    # 16 Exposure
    parser.add_argument("--exposure", type=float, default=0.0, help="-2.0 .. 2.0")
    # 17 Sticker / Overlay
    parser.add_argument("--sticker", default="")
    parser.add_argument("--sticker-pos", default="80,80", help="x,y")
    parser.add_argument("--sticker-size", type=int, default=14)
    parser.add_argument("--sticker-opacity", type=int, default=100)

    args = parser.parse_args()

    input_path = Path(args.input).expanduser()
    output_path = Path(args.output).expanduser()
    if not input_path.exists():
        print(f"Error: input file not found: {input_path}")
        print("Tip: use a real file path from your system, for example:")
        print("  find /home/pc1 -type f \\( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \\) | head")
        raise SystemExit(1)

    try:
        img = Image.open(input_path).convert("RGBA")
    except UnidentifiedImageError:
        print(f"Error: not a valid image file: {input_path}")
        raise SystemExit(1)
    except Exception as exc:
        print(f"Error: failed to open input image: {exc}")
        raise SystemExit(1)

    if args.crop:
        l, t, r, b = parse_ints(args.crop, 4)
        img = img.crop((l, t, r, b))

    if args.resize:
        rw, rh = parse_ints(args.resize, 2)
        img = img.resize((rw, rh), Image.Resampling.LANCZOS)

    if args.rotate:
        img = img.rotate(args.rotate, expand=True, resample=Image.Resampling.BICUBIC)

    img = apply_filter_preset(img, args.filter)

    exposure_gain = 1.0 + clamp(args.exposure, -2.0, 2.0) * 0.5
    img = ImageEnhance.Brightness(img).enhance(max(0.0, args.brightness * exposure_gain))
    img = ImageEnhance.Contrast(img).enhance(max(0.0, args.contrast))
    img = ImageEnhance.Color(img).enhance(max(0.0, args.saturation))
    img = apply_temperature(img, args.temperature)

    if args.blur > 0:
        img = img.filter(ImageFilter.GaussianBlur(radius=args.blur))

    img = apply_healing(img, args.heal)
    img = apply_brush(img, args.brush)

    img = ImageEnhance.Sharpness(img).enhance(max(0.0, args.sharpen))

    tx, ty = parse_ints(args.text_pos, 2)
    img = apply_text(img, args.text, tx, ty, args.text_size, args.text_color)

    img = apply_bg_remove(img, args.bg_remove)
    img = apply_clone(img, args.clone)

    sx, sy = parse_ints(args.sticker_pos, 2)
    img = apply_sticker(img, args.sticker, sx, sy, args.sticker_size, args.sticker_opacity)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(output_path)
    print(f"Saved edited image: {output_path}")


if __name__ == "__main__":
    try:
        main()
    except ValueError as exc:
        print(f"Error: {exc}")
        print("Tip: check format for crop/resize/text-pos/sticker-pos/heal/brush/clone values.")
        sys.exit(1)
