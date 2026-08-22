/* eslint-disable @next/next/no-img-element */
import { ContactBanner, FloatingActions, Footer, Header } from "./components";
import { internationalPhone, phone, services, siteConfig } from "./data";
import { articles } from "./articles-data";

const faq = [
  {
    question: "ما أفضل نوع عزل للأسطح في حائل؟",
    answer:
      "يعتمد الاختيار على حالة السطح وطبيعة الاستخدام، لكن فوم البولي يوريثان من الحلول التي تجمع بين العزل المائي والحراري وتكوّن طبقة متصلة قليلة الفواصل عند التنفيذ الصحيح.",
  },
  {
    question: "هل تقدمون ضمانًا على أعمال العزل؟",
    answer:
      "نعم، نقدم ضمانًا مكتوبًا بحسب نوع الخدمة وحالة الموقع ونظام العزل المستخدم، مع توضيح نطاق الضمان قبل بدء التنفيذ.",
  },
  {
    question: "هل المعاينة مجانية؟",
    answer:
      "نعم، يمكنك طلب معاينة أولية مجانية داخل نطاق الخدمة في حائل لتحديد سبب المشكلة والنظام المناسب قبل التنفيذ.",
  },
  {
    question: "كم يستغرق تنفيذ العزل؟",
    answer:
      "تُنجز كثير من الأعمال خلال يوم أو يومين، وقد تختلف المدة وفق مساحة الموقع وحالته والأعمال التحضيرية والمعالجات المطلوبة.",
  },
];

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/#webpage`,
      url: `${siteConfig.url}/`,
      name: "شركة عزل بحائل | العازل للعزل الحديث",
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#business` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.heroImage}`,
        width: 1408,
        height: 768,
      },
      breadcrumb: { "@id": `${siteConfig.url}/#breadcrumb` },
      mainEntity: { "@id": `${siteConfig.url}/#faq` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: `${siteConfig.url}/`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "ItemList",
      name: "خدمات العزل في حائل",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: `${siteConfig.url}/services/${service.slug}`,
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <img
            className="hero-image"
            src="/images/hero.webp"
            alt="تنفيذ عزل أسطح بالفوم والعزل المائي والحراري في حائل"
            width="1408"
            height="768"
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero-overlay" />
          <div className="shell hero-content">
            <div className="hero-copy">
              <span className="hero-badge"><i /> خدمة سريعة في جميع أحياء حائل</span>
              <h1>عزل يدوم.<br /><em>راحة تستحقها.</em></h1>
              <p>نحمي منزلك من تسربات المياه وحرارة الصيف بحلول عزل مائي وحراري احترافية، وخامات معتمدة، وضمان مكتوب.</p>
              <div className="hero-actions">
                <a className="button" href={`https://wa.me/${internationalPhone}`} target="_blank" rel="noreferrer" aria-label="طلب معاينة مجانية عبر واتساب">اطلب معاينة مجانية</a>
                <a className="text-link" href={`tel:${phone}`} aria-label={`اتصال مباشر على ${phone}`}><bdi>{phone}</bdi> اتصال مباشر</a>
              </div>
              <div className="hero-trust"><span>✓ خبرة أكثر من 15 عامًا</span><span>✓ فنيون متخصصون</span><span>✓ ضمان مكتوب</span></div>
            </div>
            <div className="hero-card">
              <span className="card-kicker">جاهزون لخدمتك</span>
              <strong>معاينة دقيقة قبل التنفيذ</strong>
              <p>نحدد سبب المشكلة ونرشح الحل المناسب دون مبالغة أو تكاليف غير ضرورية.</p>
              <div className="mini-row"><span>خدمة العملاء</span><bdi>{phone}</bdi></div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="مميزات العازل للعزل الحديث">
          <div className="shell proof-grid">
            <div><strong>+15</strong><span>عامًا من الخبرة</span></div>
            <div><strong>24/7</strong><span>استقبال الطلبات</span></div>
            <div><strong>100%</strong><span>خامات معتمدة</span></div>
            <div><strong>حائل</strong><span>تغطية جميع الأحياء</span></div>
          </div>
        </section>

        <section className="section shell" id="services">
          <div className="section-heading split-heading">
            <div><span className="eyebrow">خدماتنا</span><h2>حلول عزل لكل مساحة</h2></div>
            <p>نبدأ بالتشخيص الصحيح، ثم نختار النظام والخامة المناسبة لكل سطح أو خزان أو منطقة رطبة.</p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.slug}>
                <div className="service-image">
                  <img
                    src={service.image}
                    alt={`${service.shortTitle} في حائل بواسطة ${siteConfig.name}`}
                    width={service.imageWidth}
                    height={service.imageHeight}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>0{index + 1}</span>
                </div>
                <div className="service-body"><h3>{service.shortTitle}</h3><p>{service.description}</p><a href={`/services/${service.slug}`} aria-label={`قراءة تفاصيل ${service.shortTitle}`}>تفاصيل الخدمة <b>←</b></a></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell articles-preview" id="articles" aria-labelledby="articles-preview-title">
          <div className="section-heading split-heading"><div><span className="eyebrow">مركز المعرفة</span><h2 id="articles-preview-title">أدلة تساعدك قبل الإصلاح</h2></div><p>تعرف على علامات التسرب وطرق الفحص ومعالجة الرطوبة والعزل من خلال مقالات عملية موجهة لمنازل ومنشآت حائل.</p></div>
          <div className="article-grid article-grid-preview">
            {articles.map((article) => (
              <article className="article-card" key={article.slug}>
                <a className="article-card-image" href={`/articles/${article.slug}`} aria-label={`قراءة ${article.title}`}><img src={article.image} alt={article.imageAlt} width={article.imageWidth} height={article.imageHeight} loading="lazy" decoding="async" /></a>
                <div className="article-card-body"><span className="article-card-keyword">{article.primaryKeyword}</span><h3><a href={`/articles/${article.slug}`}>{article.title}</a></h3><p>{article.excerpt}</p><a className="article-read-link" href={`/articles/${article.slug}`}>اقرأ المقال <b>←</b></a></div>
              </article>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="shell about-grid">
            <div className="about-media">
              <img
                src="/images/work-6.webp"
                alt="فني من العازل للعزل الحديث أثناء تنفيذ أعمال العزل في حائل"
                width="1000"
                height="750"
                loading="lazy"
                decoding="async"
              />
              <div className="experience-card"><strong>15+</strong><span>سنة خبرة<br />في أعمال العزل</span></div>
            </div>
            <div className="about-copy"><span className="eyebrow">من نحن</span><h2>حماية البيت تبدأ من تنفيذ صحيح</h2><p className="lead">العازل للعزل الحديث مؤسسة متخصصة في أعمال العزل بحائل. نركز على جودة التحضير ودقة التطبيق لأن نجاح العزل لا يعتمد على الخامة وحدها، بل على تشخيص المشكلة وتجهيز السطح واختيار النظام المناسب.</p>
              <div className="check-grid"><span>مواد عزل معتمدة وآمنة</span><span>التزام بالمواعيد</span><span>تسعير واضح قبل التنفيذ</span><span>نظافة الموقع بعد العمل</span></div>
              <a className="button button-dark" href={`https://wa.me/${internationalPhone}`} target="_blank" rel="noreferrer">ناقش مشكلتك مع فني</a>
            </div>
          </div>
        </section>

        <section className="section shell process">
          <div className="section-heading center"><span className="eyebrow">كيف نعمل؟</span><h2>من المعاينة إلى الضمان</h2><p>خطوات واضحة تضمن دقة التنفيذ وتوفر عليك الوقت والتكلفة.</p></div>
          <div className="process-grid">
            <div><b>01</b><h3>تواصل ومعاينة</h3><p>استقبال طلبك وفحص المشكلة بدقة.</p></div>
            <div><b>02</b><h3>عرض الحل والسعر</h3><p>تحديد النظام والخامات والتكلفة بوضوح.</p></div>
            <div><b>03</b><h3>تنفيذ احترافي</h3><p>تحضير الموقع والتطبيق بأيدي فنيين.</p></div>
            <div><b>04</b><h3>فحص وضمان</h3><p>اختبار العمل وتسليمه مع الضمان.</p></div>
          </div>
        </section>

        <section className="work-section section" id="work">
          <div className="shell"><div className="section-heading work-heading"><div><span className="eyebrow light">من أرض الواقع</span><h2>نماذج من أعمالنا</h2></div><p>صور حقيقية من مراحل التنفيذ والمعالجة في مواقع عمل مختلفة.</p></div>
            <div className="gallery">
              {[1, 2, 3, 4, 5].map((number) => (
                <figure key={number} className={`gallery-${number}`}>
                  <img
                    src={`/images/work-${number}.webp`}
                    alt={`أعمال عزل مائي وحراري نفذها ${siteConfig.name} في حائل - صورة ${number}`}
                    width="563"
                    height="1000"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell faq" id="faq">
          <div className="faq-intro"><span className="eyebrow">أسئلة شائعة</span><h2>إجابات قبل أن تبدأ</h2><p>لو عندك سؤال آخر، تواصل معنا وسنساعدك في اختيار الحل الأنسب لموقعك.</p><a href={`tel:${phone}`} className="text-link"><bdi>{phone}</bdi> تحدث معنا</a></div>
          <div className="faq-list">{faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
        </section>

        <ContactBanner />
      </main>
      <Footer />
      <FloatingActions />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
    </>
  );
}
