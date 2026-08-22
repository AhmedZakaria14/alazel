/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
"use client";
import { useEffect } from "react";
import { internationalPhone, phone, services } from "./data";

export function Header() {
  useEffect(() => {
    const toggle = document.getElementById('nav-toggle') as HTMLInputElement;
    if (!toggle) return;

    const handleChange = () => {
      if (toggle.checked) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    toggle.addEventListener('change', handleChange);
    return () => {
      toggle.removeEventListener('change', handleChange);
      document.body.style.overflow = '';
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof document === 'undefined') return;
    
    // 1. Close the menu immediately
    const toggle = document.getElementById('nav-toggle') as HTMLInputElement;
    if (toggle) {
      toggle.checked = false;
      document.body.style.overflow = ''; // Explicitly unlock scroll
      // Force reflow to ensure menu closes before scrolling
      void toggle.offsetHeight;
    }

    // 2. Handle scrolling manually for anchors to prevent conflicts
    if (targetId.startsWith('#')) {
      const element = document.getElementById(targetId.substring(1));
      // On an inner page, keep the original href (for example /#services)
      // so the browser can navigate back to the matching section on the home page.
      if (!element) return;

      e.preventDefault();
      // Use scroll-padding-top from CSS instead of manual calculation
      const computedStyle = window.getComputedStyle(document.documentElement);
      const scrollPaddingTop = parseFloat(computedStyle.scrollPaddingTop) || 86;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - scrollPaddingTop;

        // Add a small delay to ensure menu closes before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 50);

        // Update URL hash without jumping
      window.history.pushState(null, '', targetId);
    }
  };

  return (
    <>
      <div className="topline">
        <div className="shell topline-inner">
          <span>نخدم جميع أحياء حائل</span>
          <a href={`tel:${phone}`}>اتصال مباشر: <bdi>{phone}</bdi></a>
        </div>
      </div>
      <header className="site-header">
        <div className="shell nav-wrap">
          <a className="brand" href="/" aria-label="العازل للعزل الحديث - الرئيسية">
            <img src="/images/logo.webp" alt="شعار مؤسسة العازل للعزل الحديث" width="62" height="62" />
            <span><strong>العازل للعزل الحديث</strong><small>خبراء العزل في حائل</small></span>
          </a>
          <input className="nav-toggle" type="checkbox" id="nav-toggle" />
          <label className="menu-button" htmlFor="nav-toggle" aria-label="فتح القائمة"><i /><i /><i /></label>
          <nav className="main-nav" aria-label="القائمة الرئيسية">
            <a href="/" onClick={(e) => handleNavClick(e, '/')}>الرئيسية</a>
            <a href="/#services" onClick={(e) => handleNavClick(e, '#services')}>خدماتنا</a>
            <a href="/#work" onClick={(e) => handleNavClick(e, '#work')}>أعمالنا</a>
            <a href="/#about" onClick={(e) => handleNavClick(e, '#about')}>من نحن</a>
            <a href="/#faq" onClick={(e) => handleNavClick(e, '#faq')}>الأسئلة الشائعة</a>
            <a href="/articles">المقالات</a>
          </nav>
          <a className="button button-small header-cta" href={`https://wa.me/${internationalPhone}`} target="_blank" rel="noreferrer">اطلب معاينة مجانية</a>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand">العازل للعزل الحديث</div>
          <p>حلول عزل احترافية تحمي منزلك من الحرارة والرطوبة والتسربات في حائل.</p>
        </div>
        <div><h3>الخدمات والمقالات</h3>{services.map((service) => <a key={service.slug} href={`/services/${service.slug}`}>{service.shortTitle}</a>)}<a href="/articles">مقالات كشف التسرب والعزل</a></div>
        <div><h3>تواصل معنا</h3><a href={`tel:${phone}`}>اتصال: <bdi>{phone}</bdi></a><a href={`https://wa.me/${internationalPhone}`}>واتساب: <bdi>{phone}</bdi></a><span>حائل، المملكة العربية السعودية</span></div>
      </div>
      <div className="shell copyright">
        <div>© 2026 العازل للعزل الحديث. جميع الحقوق محفوظة.</div>
        <div className="developer-credit">
          تصميم وتطوير <a href="https://nasharhub.com" target="_blank" rel="noopener noreferrer">NasharHub</a>
        </div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const whatsappMessage = encodeURIComponent("مرحبًا، أريد الاستفسار عن خدمات العزل وطلب معاينة.");

  return (
    <div className="floating-actions" aria-label="خيارات التواصل السريع">
      <a
        className="floating-button float-whatsapp"
        href={`https://wa.me/${internationalPhone}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        title="تواصل عبر واتساب"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16.04 3.2c-7.02 0-12.72 5.68-12.72 12.68 0 2.23.58 4.4 1.7 6.3L3.2 28.8l6.8-1.78a12.72 12.72 0 0 0 6.03 1.54h.01c7 0 12.72-5.69 12.72-12.68 0-3.39-1.32-6.57-3.72-8.97A12.62 12.62 0 0 0 16.04 3.2Zm0 23.22h-.01a10.55 10.55 0 0 1-5.37-1.47l-.39-.23-4.03 1.06 1.08-3.93-.25-.4a10.5 10.5 0 0 1-1.62-5.57c0-5.82 4.75-10.55 10.6-10.55 2.82 0 5.47 1.1 7.46 3.09a10.46 10.46 0 0 1 3.1 7.46c0 5.81-4.76 10.54-10.57 10.54Zm5.81-7.9c-.32-.16-1.88-.92-2.17-1.03-.29-.1-.5-.16-.72.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57a9.55 9.55 0 0 1-1.77-2.2c-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.72-.98-2.36-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.31-1.11 1.08-1.11 2.64 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.42 4.8.76.32 1.35.52 1.81.67.76.24 1.45.2 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.14-.29-.22-.61-.38Z" />
        </svg>
        <span className="floating-label">واتساب</span>
      </a>

      <a
        className="floating-button float-call"
        href={`tel:${phone}`}
        aria-label={`اتصل بنا على ${phone}`}
        title="اتصل الآن"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
        </svg>
        <span className="floating-label">اتصال</span>
      </a>
    </div>
  );
}

export function ContactBanner() {
  return (
    <section className="contact-banner shell">
      <div><span className="eyebrow light">استشارة ومعاينة مجانية</span><h2>هل تعاني من تسرب أو حرارة مرتفعة؟</h2><p>أرسل لنا تفاصيل المشكلة وسنقترح لك نظام العزل الأنسب.</p></div>
      <div className="banner-actions"><a className="button button-light" href={`https://wa.me/${internationalPhone}`}>تواصل عبر واتساب</a><a className="text-link light-link" href={`tel:${phone}`}><bdi>{phone}</bdi> اتصل الآن</a></div>
    </section>
  );
}
