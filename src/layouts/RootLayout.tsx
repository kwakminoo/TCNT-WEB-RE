import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function RootLayout() {
  return (
    <>
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
