"""Read back the public deployment after the reviewed main branch release."""
import json
import time
import urllib.request
from html.parser import HTMLParser

BASE = "https://www.azelhail.com"
EXPECTED = {
    "/articles/insulation-company-hail": "شركة عزل بحائل للأسطح والخزانات | العازل للعزل الحديث",
    "/articles/tank-insulation-company-hail": "شركة عزل خزانات بحائل | العازل للعزل الحديث",
    "/articles/roof-insulation-hail": "عزل أسطح بحائل من الحرارة والمياه | العازل للعزل الحديث",
    "/articles/ground-tank-insulation": "عزل الخزان الأرضي بحائل | معالجة الشقوق والتسرب",
    "/articles/foam-insulation-company-hail": "عزل فوم بحائل للأسطح | العازل للعزل الحديث",
    "/articles/waterproofing-leak-treatment": "العزل المائي ومعالجة التسرب بحائل | الأسطح والخزانات",
    "/articles/epoxy-tank-insulation": "عزل الخزانات بالإيبوكسي بحائل | التجهيز واختبار العزل",
}
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.metadata = {}
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "meta":
            self.metadata[a.get("name", "")] = a.get("content", "")
    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
    def handle_data(self, data):
        if self.in_title:
            self.title += data

routes = ["/", "/articles", "/services/roof-insulation", "/services/tank-insulation", "/services/bathroom-insulation", "/services/kitchen-insulation", "/articles/water-leaks-types", "/articles/specialized-leak-detection-company", "/articles/timing-moisture-water-leak", "/articles/accurate-water-leak-inspection", "/articles/treat-water-leak-insulation", *EXPECTED]
for attempt in range(6):
    try:
        titles = set()
        for route in routes:
            request = urllib.request.Request(BASE + route, headers={"User-Agent": "Alazel-SEO-Verification/1.0"})
            with urllib.request.urlopen(request, timeout=20) as response:
                assert response.status == 200, route
                for header in ("Content-Security-Policy", "Referrer-Policy", "X-Content-Type-Options", "X-Frame-Options"):
                    assert response.headers.get(header), (route, header)
                html = response.read().decode("utf-8")
            page = Page()
            page.feed(html)
            assert page.title and len(page.title) <= 60 and page.title not in titles, (route, page.title)
            titles.add(page.title)
            assert len(page.metadata.get("description", "")) <= 155, route
            if route in EXPECTED:
                assert page.title == EXPECTED[route], (route, page.title)
            assert "0596204627" in html and "اطلب معاينة الآن" in html, route
            assert "معاينة مجانية" not in html, route
        for filename in ("water-leaks-types", "specialist-leak-company", "timing-moisture", "accurate-leak-inspection", "treat-leak-protect-insulation"):
            with urllib.request.urlopen(BASE + "/images/articles/" + filename + ".webp", timeout=20) as response:
                payload = response.read()
                assert response.status == 200 and len(payload) < 200000, filename
                assert payload[:4] == b"RIFF" and payload[8:12] == b"WEBP", filename
        print(json.dumps({"public_pages_checked": len(routes), "optimized_images_checked": 5, "security_headers": "present", "metadata": "verified", "phone": "0596204627"}, ensure_ascii=False))
        break
    except Exception as exc:
        print(json.dumps({"attempt": attempt + 1, "error": str(exc)}, ensure_ascii=False), flush=True)
        if attempt == 5:
            raise
        time.sleep(10)
