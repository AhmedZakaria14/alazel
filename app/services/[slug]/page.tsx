/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBanner, FloatingActions, Footer, Header } from "../../components";
import { internationalPhone, phone, services, siteConfig } from "../../data";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};

  const pageUrl = `${siteConfig.url}/services/${service.slug}`;

  return {
    title: { absolute: service.seoTitle },
    description: service.seoDescription,
    keywords: [...service.keywords, siteConfig.name],
    alternates: {
      canonical: `/services/${service.slug}`,
      languages: { "ar-SA": `/services/${service.slug}` },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: pageUrl,
      siteName: siteConfig.name,
      title: service.seoTitle,
      description: service.seoDescription,
      images: [
        {
          url: service.image,
          width: service.imageWidth,
          height: service.imageHeight,
          alt: `${service.title} بواسطة ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const pageUrl = `${siteConfig.url}/services/${service.slug}`;
  const serviceId = `${pageUrl}#service`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const faqId = `${pageUrl}#faq`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: service.seoTitle,
        description: service.seoDescription,
        inLanguage: siteConfig.language,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": serviceId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteConfig.url}${service.image}`,
          width: service.imageWidth,
          height: service.imageHeight,
        },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: [{ "@id": serviceId }, { "@id": faqId }],
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: service.title,
        serviceType: service.shortTitle,
        description: service.description,
        url: pageUrl,
        image: `${siteConfig.url}${service.image}`,
        provider: { "@id": `${siteConfig.url}/#business` },
        areaServed: [
          { "@type": "City", name: siteConfig.city },
          { "@type": "AdministrativeArea", name: siteConfig.region },
        ],
        availableChannel: [
          {
            "@type": "ServiceChannel",
            servicePhone: {
              "@type": "ContactPoint",
              telephone: `+${siteConfig.internationalPhone}`,
              contactType: "customer service",
              availableLanguage: "Arabic",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: `${siteConfig.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "خدمات العزل",
            item: `${siteConfig.url}/#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.shortTitle,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <section className="service-hero">
          <div className="shell">
            <nav className="breadcrumbs" aria-label="مسار التنقل"><a href="/">الرئيسية</a> / <a href="/#services">خدمات العزل</a> / <span aria-current="page">{service.shortTitle}</span></nav>
            <div className="service-hero-grid">
              <div><span className="eyebrow light">{service.eyebrow}</span><h1>{service.title}</h1><p>{service.description}</p><a className="button" href={`https://wa.me/${internationalPhone}`} target="_blank" rel="noreferrer">اطلب معاينة مجانية</a></div>
              <div className="service-hero-image">
                <img
                  src={service.image}
                  alt={`${service.title} بواسطة ${siteConfig.name}`}
                  width={service.imageWidth}
                  height={service.imageHeight}
                  loading="eager"
                  fetchPriority="high"
                />
                <span>تنفيذ احترافي بضمان</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section shell service-content">
          <article>
            <span className="eyebrow">تفاصيل الخدمة</span>
            <h2>حل عملي يناسب حالة موقعك</h2>
            <p>{service.description} نعاين الموقع أولًا ونشرح لك سبب المشكلة وخيارات المعالجة، ثم نحدد الخامات المناسبة والتكلفة قبل التنفيذ. بهذه الطريقة يكون قرار العزل مبنيًا على حالة الموقع الفعلية وليس على حل واحد لكل المشكلات.</p>
            <div className="feature-list">{service.features.map((feature) => <span key={feature}>✓ {feature}</span>)}</div>

            <span className="eyebrow">متى تحتاج الخدمة؟</span>
            <h2>علامات تستحق الفحص قبل أن تتفاقم</h2>
            <ul className="service-signs">
              {service.signs.map((sign) => <li key={sign}>{sign}</li>)}
            </ul>

            <span className="eyebrow">اختيار النظام المناسب</span>
            <h2>المعاينة الجيدة تمنع الحلول المؤقتة</h2>
            <p>{service.benefits}</p>

            <span className="eyebrow">مراحل العمل</span>
            <h2>تنفيذ منظم خطوة بخطوة</h2>
            <ol className="steps-list">{service.steps.map((step) => <li key={step}>{step}</li>)}</ol>

            <section className="service-faq" aria-labelledby="service-faq-title">
              <span className="eyebrow">أسئلة شائعة</span>
              <h2 id="service-faq-title">ما الذي تحتاج معرفته عن {service.shortTitle}؟</h2>
              <div className="faq-list">
                {service.faq.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}<span>+</span></summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>
          <aside className="side-contact"><span className="eyebrow">تواصل سريع</span><h3>اطلب تقييم المشكلة</h3><p>أرسل صور الموقع عبر واتساب لتحصل على تقييم أولي، أو اطلب معاينة ميدانية داخل حائل.</p><a className="button" href={`https://wa.me/${internationalPhone}`} target="_blank" rel="noreferrer">تواصل عبر واتساب</a><a className="phone-box" href={`tel:${phone}`}><bdi>{phone}</bdi></a></aside>
        </section>
        <ContactBanner />
      </main>
      <Footer />
      <FloatingActions />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
