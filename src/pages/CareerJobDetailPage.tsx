import { Link, Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { JobSectionHead } from "../components/page/JobSectionHead";
import { SubpageShell } from "../components/SubpageShell";
import {
  careerJobStatusLabel,
  findCareerJobById,
  formatCareerJobDeadline,
} from "../content/career/careerJobs";
import { findParentGroup } from "../content/navData";

export function CareerJobDetailPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const posting = id ? findCareerJobById(id) : undefined;
  const careerNav = findParentGroup(pathname);

  if (!posting) {
    return <Navigate to="/career/jobs" replace />;
  }

  return (
    <SubpageShell
      className="page-shell--jobs page-shell--jobs-detail"
      intro={
        <>
          <BreadcrumbNav />
          <p className="career-jobs-detail__meta">
            <span className={`career-jobs-detail__status career-jobs-detail__status--${posting.status}`}>
              {careerJobStatusLabel(posting.status)}
            </span>
            <time dateTime={posting.deadline}>
              마감 {formatCareerJobDeadline(posting.deadline)}
            </time>
          </p>
          <h1 id="page-title">채용공고</h1>
        </>
      }
      subNav={
        careerNav?.label === "인재채용" ? (
          <nav className="page-local-nav" aria-label="인재채용 하위 메뉴">
            <div className="container page-local-nav__inner">
              {careerNav.children.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `page-local-nav__link${isActive ? " page-local-nav__link--active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        ) : undefined
      }
    >
      <div className="career-jobs-page career-jobs-page--detail">
        <section className="career-jobs-board career-jobs-board--detail" aria-labelledby="career-jobs-detail-heading">
          <div className="container career-jobs-detail">
            <JobSectionHead id="career-jobs-detail-heading" title={posting.title} />
            <dl className="career-jobs-detail__facts">
              <div>
                <dt>모집부문</dt>
                <dd>{posting.department}</dd>
              </div>
              <div>
                <dt>고용형태</dt>
                <dd>{posting.employment_type}</dd>
              </div>
              <div>
                <dt>근무지</dt>
                <dd>{posting.workplace}</dd>
              </div>
            </dl>
            <article className="prose career-jobs-detail__body">
              {posting.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                <Link to="/career/jobs" className="btn btn-ghost">
                  목록으로
                </Link>
              </p>
            </article>
          </div>
        </section>
      </div>
    </SubpageShell>
  );
}
