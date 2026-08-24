/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBanner, FloatingActions, Footer, Header } from "../../components";
import { articleBySlug, articles } from "../../articles-data";
import { internationalPhone, phone, siteConfig } from "../../data";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};
  const pageUrl = `${siteConfig.url}/articles/${article.slug}`;
  return {
    title: { absolute: article.seoTitle },
    description: article.seoDescription,
    keywords: article.keywords,
    alternates: { canonical: `/articles/${article.slug}`, languages: { "ar-SA": `/articles/${article.slug}` } },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url: pageUrl,
      siteName: siteConfig.name,
      title: article.seoTitle,
      description: article.seoDescription,
      images: [{ url: `${siteConfig.url}${article.image}`, width: article.imageWidth, height: article.imageHeight, alt: article.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: article.seoTitle, description: article.seoDescription, images: [`${siteConfig.url}${article.image}`] },
  };
}

function faqItems(article: typeof articles[number]) {
  const start = article.blocks.findIndex((block) => block.type === "heading" && block.text === "الأسئلة الشائعة");
  if (start < 0) return [];
  const items: { question: string; answer: string }[] = [];
  for (let i = start + 1; i < article.blocks.length; i += 1) {
    const question = article.blocks[i];
    const answer = article.blocks[i + 1];
    if (question?.type === "heading" && answer?.type === "paragraph") {
      items.push({ question: question.text, answer: answer.text });
      i += 1;
    }
  }
  return items;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const pageUrl = `${siteConfig.url}/articles/${article.slug}`;
  const faq = faqItems(article);
  const relatedArticles = article.relatedSlugs.map((relatedSlug) => articleBySlug(relatedSlug)).filter(Boolean);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: article.title,
        description: article.seoDescription,
        inLanguage: siteConfig.language,
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        image: [`${siteConfig.url}${article.image}`],
        author: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
        publisher: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url, logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.logo}` } },
        datePublished: "2026-08-22",
        dateModified: "2026-08-22",
        keywords: article.keywords.join(", "),
        articleSection: "كشف تسربات المياه والعزل",
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: article.seoTitle,
        description: article.seoDescription,
        inLanguage: siteConfig.language,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${siteConfig.url}${article.image}`, width: article.imageWidth, height: article.imageHeight },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": `${pageUrl}#article` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${siteConfig.url}/` },
          { "@type": "ListItem", position: 2, name: "المقالات", item: `${siteConfig.url}/articles` },
          { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
        ],
      },
      ...(faq.length ? [{ "@type": "FAQPage", "@id": `${pageUrl}#faq`, mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }] : []),
    ],
  };

  return (
    <>
      <Header />
      <main>
        <section className="article-hero article-hero-premium">
          <div className="shell">
            <nav className="breadcrumbs" aria-label="مسار التنقل"><Link href="/">الرئيسية</Link> / <Link href="/articles">المقالات</Link> / <span aria-current="page">{article.title}</span></nav>
            <div className="article-hero-grid">
              <div className="article-hero-copy"><span className="inner-kicker">ALAZEL / FIELD NOTE</span><span className="eyebrow light">{article.primaryKeyword}</span><h1>{article.title}</h1><p>{article.excerpt}</p><div className="article-hero-meta"><span>دليل عملي</span><span>قراءة واضحة</span><span>حائل</span></div></div>
              <div className="article-hero-image"><img src={article.image} alt={article.imageAlt} width={article.imageWidth} height={article.imageHeight} fetchPriority="high" /></div>
            </div>
          </div>
        </section>

        <section className="section shell article-layout article-layout-premium">
          <article className="article-main">
            <div className="article-meta"><span><b>ALAZEL</b> دليل عملي من العازل للعزل الحديث</span><span>خدمة العزل وكشف التسرب في حائل</span></div>
            <nav className="toc toc-premium" aria-label="فهرس محتويات المقال"><span className="toc-index">/ 01</span>
              <strong>فهرس المحتويات</strong>
              <ol>{article.toc.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.text}</a></li>)}</ol>
            </nav>
            <div className="article-prose">
              {article.blocks.map((block, index) => {
                if (block.type === "paragraph") return <p key={`${block.type}-${index}`}>{block.text}</p>;
                const isH2 = block.id?.split("-").length === 2;
                if (isH2) return <h2 id={block.id} key={`${block.type}-${index}`}>{block.text}</h2>;
                return <h3 id={block.id} key={`${block.type}-${index}`}>{block.text}</h3>;
              })}
            </div>
            {relatedArticles.length > 0 && (
              <aside className="related-articles" aria-labelledby="related-articles-title">
                <span className="eyebrow">اقرأ أيضًا</span>
                <h2 id="related-articles-title">مقالات مرتبطة بكشف التسرب والعزل</h2>
                <div className="related-links">
                  {relatedArticles.map((related) => related && <a key={related.slug} href={`/articles/${related.slug}`} target="_blank" rel="noopener noreferrer"><span>{related.primaryKeyword}</span><strong>{related.title}</strong><b>فتح المقال ←</b></a>)}
                </div>
              </aside>
            )}
          </article>

          <aside className="article-sidebar">
            <div className="side-contact article-contact article-contact-premium"><span className="side-contact-index">/ TALK TO US</span><span className="eyebrow">تواصل سريع</span><h3>هل لديك تسريب<br />يحتاج فحصًا؟</h3><p>أرسل صور المكان ووقت ظهور الرطوبة عبر واتساب، أو اطلب معاينة داخل حائل.</p><a className="button" href={`https://wa.me/${internationalPhone}`} target="_blank" rel="noopener noreferrer">تواصل عبر واتساب <span className="button-arrow">←</span></a><a className="phone-box" href={`tel:${phone}`}><bdi>{phone}</bdi></a></div>
            <div className="sidebar-keywords"><span className="eyebrow">موضوع المقال</span><p>{article.primaryKeyword}</p><div>{article.keywords.slice(1, 5).map((keyword) => <span key={keyword}>{keyword}</span>)}</div></div>
          </aside>
        </section>
        <ContactBanner />
      </main>
      <Footer />
      <FloatingActions />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
