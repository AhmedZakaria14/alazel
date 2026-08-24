import Link from "next/link";
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
      itemListElement: [{ "@type": "ListItem", position: 1, name: "الرئيسية", item: `${siteConfig.url}/` }],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
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

function ServiceMark({ index }: { index: number }) {
  const paths = [
    "M4 18.5 12 4l8 14.5H4Zm8-9.2v5.1m0 3.3h.01",
    "M5 7.5h14v11H5zM8 7.5V5h8v2.5M8 12h8m-4-2v4",
    "M4.5 17.5h15M6 17.5V9l6-4 6 4v8.5M9 17.5v-5h6v5",
    "M4 7h16M5.5 7v10h13V7M8 4.5h8L17 7H7l1-2.5ZM8 11h8m-8 3h5",
  ];
  return (
    <span className="service-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        <path d={paths[index] ?? paths[0]} />
      </svg>
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero hero-reimagined" id="home">
          <img className="hero-image" src="/images/hero.webp" alt="تنفيذ عزل أسطح بالفوم والعزل المائي والحراري في حائل" width="1408" height="768" loading="eager" fetchPriority="high" />
          <div className="hero-overlay" />
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="shell hero-content">
            <div className="hero-copy">
              <span className="hero-kicker">ALAZEL <b>/</b> MODERN INSULATION</span>
              <span className="hero-badge"><i /> خدمة سريعة في جميع أحياء حائل</span>
              <h1>حماية تُرى.<br /><em>وراحة تُحس.</em></h1>
              <p>العزل الصح لا يبدأ من الخامة، يبدأ من فهم المشكلة. نشخّص، نجهّز، وننفذ حلولًا مائية وحرارية تحمي بيتك من أول موسم.</p>
              <div className="hero-actions">
                <a className="button" href={`https://wa.me/${internationalPhone}`} target="_blank" rel="noreferrer">اطلب معاينة مجانية <span className="button-arrow">←</span></a>
                <a className="text-link" href={`tel:${phone}`}><bdi>{phone}</bdi> اتصال مباشر</a>
              </div>
              <div className="hero-proof"><span><b>15+</b> سنة خبرة</span><span><b>4</b> حلول متخصصة</span><span><b>1</b> فريق يضمن النتيجة</span></div>
            </div>
            <div className="hero-stack">
              <div className="hero-card hero-card-primary">
                <div className="card-topline"><span className="card-kicker">من أول زيارة</span><span className="card-status"><i /> متاحون الآن</span></div>
                <strong>تشخيص واضح.<br />تنفيذ يطمنك.</strong>
                <p>نحدد سبب المشكلة ونرشح الحل المناسب دون مبالغة أو تكاليف غير ضرورية.</p>
                <div className="card-meter"><span>جودة التنفيذ</span><b>98%</b><i><em /></i></div>
                <div className="mini-row"><span>خدمة العملاء</span><bdi>{phone}</bdi></div>
              </div>
              <div className="hero-stamp"><span>ضمان</span><strong>مكتوب</strong><small>على التنفيذ</small></div>
            </div>
          </div>
          <div className="hero-scroll"><span>اكتشف حلولنا</span><i /></div>
        </section>

        <section className="signal-bar" aria-label="مميزات العازل للعزل الحديث">
          <div className="shell signal-grid">
            <div><small>01</small><strong>فحص دقيق</strong><span>قبل أي قرار</span></div>
            <div><small>02</small><strong>خامات معتمدة</strong><span>مناسبة لكل حالة</span></div>
            <div><small>03</small><strong>فنيون متخصصون</strong><span>تنفيذ نظيف ومنظم</span></div>
            <div><small>04</small><strong>ضمان مكتوب</strong><span>راحة بعد التسليم</span></div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="shell">
            <div className="section-heading split-heading section-heading-new"><div><span className="eyebrow">01 / خدماتنا</span><h2>نحل المشكلة<br /><em>من جذورها.</em></h2></div><p>كل مساحة لها طبيعتها. لذلك لا نبيع حلًا واحدًا للجميع؛ نقرأ المكان أولًا ثم نبني نظام العزل المناسب له.</p></div>
            <div className="service-bento">
              {services.map((service, index) => (
                <article className={`service-card service-bento-card service-bento-${index + 1}`} key={service.slug}>
                  <div className="service-image"><img src={service.image} alt={`${service.shortTitle} في حائل بواسطة ${siteConfig.name}`} width={service.imageWidth} height={service.imageHeight} loading="lazy" decoding="async" /><span className="service-number">0{index + 1}</span></div>
                  <div className="service-body"><ServiceMark index={index} /><div><span className="service-type">{service.eyebrow}</span><h3>{service.shortTitle}</h3><p>{service.description}</p><a href={`/services/${service.slug}`} aria-label={`قراءة تفاصيل ${service.shortTitle}`}>اكتشف الحل <b>←</b></a></div></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="diagnosis-section" id="about">
          <div className="shell diagnosis-grid">
            <div className="diagnosis-copy"><span className="eyebrow light">02 / فلسفتنا</span><h2>العزل مش مجرد<br /><em>طبقة على السطح.</em></h2><p>النتيجة الحقيقية تأتي من التفاصيل التي لا تراها: قراءة مصدر الرطوبة، تجهيز السطح، معالجة الفواصل، ثم تطبيق النظام بالسماكة والطريقة الصحيحة.</p><a className="button button-light" href={`https://wa.me/${internationalPhone}`} target="_blank" rel="noreferrer">ناقش مشكلتك مع فني <span className="button-arrow">←</span></a></div>
            <div className="diagnosis-panel"><div className="panel-label">كيف نضمن النتيجة؟</div><div className="diagnosis-list"><div><b>01</b><span><strong>نعاين قبل أن نعرض</strong><small>لا تخمينات ولا حلول جاهزة.</small></span></div><div><b>02</b><span><strong>نشرح قبل أن ننفذ</strong><small>الخامة، المدة، والتكلفة بوضوح.</small></span></div><div><b>03</b><span><strong>نختبر قبل أن نسلّم</strong><small>نراجع العمل ونترك المكان مرتبًا.</small></span></div></div><div className="panel-signature"><span>ALAZEL</span><b>من حائل، لبيوت تستحق الحماية.</b></div></div>
          </div>
        </section>

        <section className="section process process-reimagined">
          <div className="shell"><div className="section-heading center"><span className="eyebrow">03 / كيف نعمل؟</span><h2>أربع خطوات.<br /><em>ولا خطوة عشوائية.</em></h2><p>تجربة منظمة من أول مكالمة حتى لحظة استلام العمل.</p></div><div className="process-timeline"><div className="timeline-line" aria-hidden="true" />{[{n:"01",title:"تواصل ومعاينة",text:"نسمع المشكلة ونفحص المكان بدقة."},{n:"02",title:"حل وسعر واضح",text:"نحدد النظام والخامات والتكلفة قبل البدء."},{n:"03",title:"تنفيذ احترافي",text:"فريق متخصص يجهز ويطبق وينظف الموقع."},{n:"04",title:"فحص وضمان",text:"نختبر النتيجة ونسلمك ضمانًا مكتوبًا."}].map((step) => <div className="timeline-step" key={step.n}><b>{step.n}</b><span className="timeline-dot" /><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></div>
        </section>

        <section className="work-section section" id="work">
          <div className="shell"><div className="section-heading work-heading"><div><span className="eyebrow light">04 / من أرض الواقع</span><h2>شغل يتكلم<br /><em>عن نفسه.</em></h2></div><p>صور حقيقية من مراحل التنفيذ والمعالجة في مواقع عمل مختلفة داخل حائل.</p></div><div className="gallery gallery-reimagined">{[1, 2, 3, 4, 5].map((number) => <figure key={number} className={`gallery-${number}`}><img src={`/images/work-${number}.webp`} alt={`أعمال عزل مائي وحراري نفذتها ${siteConfig.name} في حائل - صورة ${number}`} width="563" height="1000" loading="lazy" decoding="async" /><span className="gallery-tag">تنفيذ العازل / {String(number).padStart(2, "0")}</span></figure>)}</div></div>
        </section>

        <section className="section articles-preview" id="articles">
          <div className="shell"><div className="section-heading split-heading"><div><span className="eyebrow">05 / مركز المعرفة</span><h2>افهم المشكلة<br /><em>قبل ما تصلحها.</em></h2></div><p>أدلة عملية تساعدك على قراءة علامات التسرب والرطوبة واختيار الخطوة الصحيحة قبل دفع أي تكلفة.</p></div><div className="article-grid article-grid-preview">{articles.slice(0, 3).map((article, index) => <article className={`article-card article-card-premium article-card-${index + 1}`} key={article.slug}><a className="article-card-image" href={`/articles/${article.slug}`} aria-label={`قراءة ${article.title}`}><img src={article.image} alt={article.imageAlt} width={article.imageWidth} height={article.imageHeight} loading="lazy" decoding="async" /><span>{String(index + 1).padStart(2, "0")}</span></a><div className="article-card-body"><span className="article-card-keyword">{article.primaryKeyword}</span><h3><a href={`/articles/${article.slug}`}>{article.title}</a></h3><p>{article.excerpt}</p><a className="article-read-link" href={`/articles/${article.slug}`}>اقرأ الدليل <b>←</b></a></div></article>)}</div><Link className="archive-link" href="/articles">عرض كل المقالات <span>←</span></Link></div>
        </section>

        <section className="section faq faq-reimagined" id="faq">
          <div className="shell"><div className="faq-intro"><span className="eyebrow">06 / أسئلة شائعة</span><h2>خلّي كل حاجة<br /><em>واضحة.</em></h2><p>لو عندك سؤال آخر، تواصل معنا وسنساعدك في اختيار الحل الأنسب لموقعك.</p><a href={`tel:${phone}`} className="text-link"><bdi>{phone}</bdi> تحدث معنا</a></div><div className="faq-list">{faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></div>
        </section>

        <ContactBanner />
      </main>
      <Footer />
      <FloatingActions />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
    </>
  );
}
