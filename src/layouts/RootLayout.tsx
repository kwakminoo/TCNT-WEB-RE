import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ScrollToTop } from "../components/ScrollToTop";

export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <Header />
      <main id="main" className="site-main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
