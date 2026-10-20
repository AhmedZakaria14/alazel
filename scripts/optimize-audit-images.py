"""Create efficient article images, retaining optimized JPEG legacy URLs."""
import io
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
saved = 0
created = []
for path in sorted((root / "public/images/articles").glob("*.jpg")):
    target = path.with_suffix(".webp")
    if target.exists():
        continue
    before = path.stat().st_size
    with Image.open(path) as image:
        image = image.convert("RGB")
        image.thumbnail((1600, 900), Image.Resampling.LANCZOS)
        assert image.size == (1600, 900), (path, image.size)
        for quality in (82, 78, 74, 70):
            output = io.BytesIO()
            image.save(output, "WEBP", quality=quality, method=6)
            if output.tell() <= 100000:
                break
        target.write_bytes(output.getvalue())
        image.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    saved += before - target.stat().st_size
    created.append({"file": str(target.relative_to(root)), "bytes": target.stat().st_size})
logo = root / "public/images/logo.webp"
small = logo.with_name("logo-small.webp")
if not small.exists():
    with Image.open(logo) as image:
        image.thumbnail((192, 192), Image.Resampling.LANCZOS)
        image.save(small, "WEBP", lossless=True, method=6)
print(json.dumps({"article_bytes_saved_per_full_set": saved, "created": created, "header_logo_bytes": small.stat().st_size}, indent=2))
