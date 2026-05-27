import { Link } from "react-router-dom";

const assetBase = import.meta.env.BASE_URL;

const relatedLinks = [
  {
    label: "태일 인트라넷",
    href: "http://intranet.taeilcnt.co.kr/grp/index.jsp",
    title: "태일씨앤티 인트라넷 (새 창)",
  },
  {
    label: "태일 NAS",
    href: "http://mail.taeilcnt.co.kr:5000/#/signin",
    title: "태일씨앤티 NAS (새 창)",
  },
  {
    label: "태일 원격지원",
    href: "http://210.126.2.139:8080/",
    title: "태일씨앤티 PC 원격지원 (새 창)",
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <img
              className="footer-brand-logo"
              src={`${assetBase}brand/logo-mark-removebg.png`}
              width={160}
              height={56}
              alt="(주)태일씨앤티"
            />
          </div>
          <div className="footer-meta">
            <p>
              서울시 금천구 가산디지털2로 101(가산동 549-1)
              <br />
              한라원앤원타워 B동 17층 1701호
            </p>
            <p>
              TEL <a href="tel:07088970761">070-8897-0761</a> · FAX
              02-2101-2141
            </p>
            <p className="footer-copy">
              COPYRIGHT (c) BY TAEILCNT, ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
        <div>
          <p className="footer-heading">바로가기</p>
          <div className="footer-links">
            <Link to="/about/greeting">회사소개</Link>
            <Link to="/legal/privacy">개인정보처리방침</Link>
            <Link to="/legal/email-collection">이메일무단수집거부</Link>
            <a
              href="http://www.taeilcnt.co.kr/home/index.jsp"
              target="_blank"
              rel="noopener noreferrer"
              title="태일씨앤티 홈페이지 (새 창)"
            >
              http://www.taeilcnt.co.kr/home/index.jsp
            </a>
          </div>
        </div>
        <div>
          <p className="footer-heading">FAMILY SITE</p>
          <div className="footer-related">
            {relatedLinks.map((r) => (
              <a
                key={r.label}
                href={r.href}
                title={r.title}
                target="_blank"
                rel="noopener noreferrer"
              >
                {r.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
