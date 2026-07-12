# العازل للعزل الحديث

موقع عربي متجاوب لمؤسسة العازل للعزل الحديث لخدمات العزل في حائل، مبني بـ Next.js ومهيأ للنشر عبر مستودع GitHub.

## التشغيل محليًا

```bash
npm install
npm run dev
```

## البناء والفحص

```bash
npm run build
npm run test
```

## إعدادات السيو المضافة

- عناوين وأوصاف فريدة للصفحة الرئيسية ولكل صفحة خدمة.
- روابط Canonical ووسوم اللغة العربية السعودية.
- Open Graph وTwitter Cards وصور مشاركة اجتماعية.
- `robots.txt` يسمح لمحركات البحث وزواحف البحث بالذكاء الاصطناعي بالوصول للمحتوى.
- `sitemap.xml` ديناميكي يتضمن جميع الصفحات وصور الخدمات والأعمال.
- بيانات منظمة JSON-LD من أنواع LocalBusiness وHomeAndConstructionBusiness وWebSite وService وBreadcrumbList وFAQPage.
- ملف Web App Manifest وأيقونات Favicon كاملة.
- ملف `llms.txt` كملخص اختياري للأنظمة التي تقرأه، مع بقاء HTML والبيانات المنظمة المصدر الأساسي.
- دعم IndexNow عبر ملف مفتاح في جذر الموقع، وسكربت `npm run indexnow`، وGitHub Action يعمل بعد رفع التحديثات.
- صفحة 404 مخصصة مع استجابة HTTP 404 صحيحة حتى لا تُعامل كرابط صالح.
- تحسين ثبات الصور بإضافة الأبعاد وتحميل صورة الواجهة الرئيسية بأولوية مرتفعة.

## ربط أدوات مشرفي المواقع

بعد إضافة الموقع في Google Search Console وBing Webmaster Tools، يمكن إضافة رموز التحقق كمتغيرات بيئة أثناء البناء:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ضع_رمز_جوجل_هنا
NEXT_PUBLIC_BING_SITE_VERIFICATION=ضع_رمز_بينج_هنا
NEXT_PUBLIC_YANDEX_SITE_VERIFICATION=ضع_رمز_ياندكس_هنا
```

ثم أعد بناء الموقع ونشره. بعد النشر أرسل الرابط التالي داخل Google Search Console:

```text
https://roknalebtesama.com/sitemap.xml
```

ولإشعار محركات البحث المشاركة في IndexNow يدويًا بعد التأكد من نشر النسخة الجديدة:

```bash
npm run indexnow
```

بيانات التواصل المستخدمة في الموقع: `0574135600` — حائل، المملكة العربية السعودية.
