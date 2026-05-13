import { Link } from "react-router-dom";

const assetBase = import.meta.env.BASE_URL;

const relatedLinks = [
  { label: "태일 인트라넷", href: "#", note: "운영 시 내부 URL로 연결" },
  { label: "태일 NAS", href: "#", note: "운영 시 내부 URL로 연결" },
  { label: "태일 원격지원", href: "#", note: "운영 시 지원 URL로 연결" },
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
            <Link to="/site-map">사이트맵</Link>
          </div>
        </div>
        <div>
          <p className="footer-heading">관련사이트</p>
          <div className="footer-related">
            {relatedLinks.map((r) => (
              <a key={r.label} href={r.href} title={r.note}>
                {r.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
