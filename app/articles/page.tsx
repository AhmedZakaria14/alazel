/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { ContactBanner, FloatingActions, Footer, Header } from "../components";
import { articles } from "../articles-data";
import { siteConfig } from "../data";

export const metadata: Metadata = {
  title: { absolute: "مقالات كشف تسربات المياه والعزل في حائل | العازل للعزل الحديث" },
  description: "أدلة عملية عن كشف تسريبات المياه وفحص التسرب ومعالجة الرطوبة وحماية العزل في حائل من شركة العازل للعزل الحديث.",
  keywords: ["كشف تسريبات المياه", "شركة كشف تسريبات", "فحص تسريب المياه", "تسريب مياه", "حائل"],
  alternates: { canonical: "/articles", languages: { "ar-SA": "/articles" } },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: `${siteConfig.url}/articles`,
    siteName: siteConfig.name,
    title: "مقالات كشف تسربات المياه والعزل في حائل",
    description: "أدلة عملية تساعدك على فهم التسرب واختيار طريقة الفحص والمعالجة المناسبة.",
  },
};

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="service-hero articles-index-hero">
          <div className="shell">
            <nav className="breadcrumbs" aria-label="مسار التنقل"><Link href="/">الرئيسية</Link> / <span aria-current="page">المقالات</span></nav>
            <div className="articles-index-copy">
              <span className="eyebrow light">مركز المعرفة</span>
              <h1>دليل عملي لفهم التسرب والعزل</h1>
              <p>مقالات مبسطة تساعدك على قراءة علامات الرطوبة، فهم طرق الكشف، ومعرفة الخطوة المناسبة قبل الإصلاح أو إعادة العزل.</p>
            </div>
          </div>
        </section>

        <section className="section shell articles-index" aria-labelledby="articles-index-title">
          <div className="section-heading split-heading">
            <div><span className="eyebrow">مقالاتنا</span><h2 id="articles-index-title">إجابات واضحة قبل اتخاذ القرار</h2></div>
            <p>نكتب عن المشكلات الشائعة في المنازل والمنشآت داخل حائل بلغة عملية، مع توضيح الفرق بين كشف المصدر وإصلاحه ومعالجة العزل.</p>
          </div>
          <div className="article-grid">
            {articles.map((article) => (
              <article className="article-card" key={article.slug}>
                <a className="article-card-image" href={`/articles/${article.slug}`} aria-label={`قراءة ${article.title}`}>
                  <img src={article.image} alt={article.imageAlt} width={article.imageWidth} height={article.imageHeight} loading="lazy" decoding="async" />
                </a>
                <div className="article-card-body">
                  <span className="article-card-keyword">{article.primaryKeyword}</span>
                  <h3><a href={`/articles/${article.slug}`}>{article.title}</a></h3>
                  <p>{article.excerpt}</p>
                  <a className="article-read-link" href={`/articles/${article.slug}`}>اقرأ المقال <b>←</b></a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <ContactBanner />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
