import type { Metadata } from "next";
import Link from "next/link";
import { FloatingActions, Footer, Header } from "./components";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="section shell center" style={{ minHeight: "55vh", display: "grid", placeContent: "center" }}>
          <span className="eyebrow">خطأ 404</span>
          <h1>الصفحة التي تبحث عنها غير موجودة</h1>
          <p>قد يكون الرابط قد تغير أو كُتب بصورة غير صحيحة. يمكنك العودة إلى الصفحة الرئيسية واستعراض خدمات العزل.</p>
          <p><Link className="button" href="/">العودة إلى الرئيسية</Link></p>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
