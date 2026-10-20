"""Download commissioned article illustrations and create local, optimized WebP assets."""
from pathlib import Path
import hashlib
import io
import json
import urllib.request
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / "scripts/article-image-sources.json").read_text())
for item in manifest:
    dest = root / "public/images/articles" / (item["slug"] + ".webp")
    if dest.exists():
        continue
    request = urllib.request.Request(item["url"], headers={"User-Agent": "Alazel-Article-Images/1.0"})
    with urllib.request.urlopen(request, timeout=90) as response:
        raw = response.read(20_000_000)
    image = ImageOps.exif_transpose(Image.open(io.BytesIO(raw))).convert("RGB")
    image = ImageOps.fit(image, (1600, 900), method=Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    for quality in (82, 76, 68, 60):
        image.save(dest, "WEBP", quality=quality, method=6)
        if dest.stat().st_size < 190000:
            break
    assert dest.stat().st_size < 200000, dest
    print(json.dumps({"image": str(dest.relative_to(root)), "dimensions": image.size, "bytes": dest.stat().st_size}))
