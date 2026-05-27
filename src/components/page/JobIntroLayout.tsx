import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  JOB_INTRO_ROLES,
  JOB_INTRO_SECTION_LABEL,
  type JobIntroRole,
  type JobIntroSectionKey,
  type JobIntroSplitBlock,
} from "../../content/career/jobIntroData";
import { JobSectionHead } from "./JobSectionHead";
import { RecruitmentGuideSection } from "./RecruitmentGuideSection";

const assetBase = import.meta.env.BASE_URL;

function assetUrl(src: string): string {
  return src.startsWith("http") ? src : `${assetBase}${src.replace(/^\//, "")}`;
}

type DialogState = {
  job: JobIntroRole;
  section: JobIntroSectionKey;
} | null;

function sectionBody(role: JobIntroRole, section: JobIntroSectionKey): readonly string[] {
  if (section === "overview") return role.overview;
  if (section === "competency") return role.competency;
  return role.vision;
}

function splitSectionBody(block: JobIntroSplitBlock, section: JobIntroSectionKey): readonly string[] {
  if (section === "overview") return block.overview;
  if (section === "competency") return block.competency;
  return block.vision;
}

function hasSplitSections(role: JobIntroRole): role is JobIntroRole & { splits: readonly JobIntroSplitBlock[] } {
  return Boolean(role.splits?.length);
}

/**
 * 인재채용 &gt; 직무소개 — 레거시 직무 안내(태일씨앤티 홈페이지 기준) 및 상세 모달.
 */
export function JobIntroLayout() {
  const [dialog, setDialog] = useState<DialogState>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setDialog(null), []);

  const dialogTitleId = "job-intro-modal-title";

  useEffect(() => {
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog, close]);

  useEffect(() => {
    if (dialog) closeBtnRef.current?.focus();
  }, [dialog]);

  const modalSectionLabel = dialog ? JOB_INTRO_SECTION_LABEL[dialog.section] : "";

  const sectionIntro = useMemo(() => {
    if (!dialog) return "";
    const splitHint = hasSplitSections(dialog.job) ? " 인사와 총무를 구분해 안내합니다." : "";
    switch (dialog.section) {
      case "overview":
        return `직무의 주요 업무 영역을 요약합니다.${splitHint}`;
      case "competency":
        return `해당 직무 수행에 필요한 역량입니다.${splitHint}`;
      case "vision":
        return `성장·발전 방향에 대한 안내입니다.${splitHint}`;
      default:
        return "";
    }
  }, [dialog]);

  const openSection = (job: JobIntroRole, section: JobIntroSectionKey) => {
    setDialog({ job, section });
  };

  return (
    <div className="job-intro-page">
      <RecruitmentGuideSection />

      <section className="job-intro-roles" aria-labelledby="job-intro-roles-heading">
        <div className="container">
          <JobSectionHead id="job-intro-roles-heading" title="직무별 안내" className="job-intro-roles__head" />

          <ul className="job-intro-grid">
            {JOB_INTRO_ROLES.map((job, index) => (
              <li key={job.id}>
                <article className="job-intro-card">
                  <div className="job-intro-card__frame">
                    <img
                      className="job-intro-card__img"
                      src={assetUrl(job.imageSrc)}
                      alt={job.imageAlt}
                      width={640}
                      height={853}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <div className="job-intro-card__scrim" aria-hidden />
                    <div className="job-intro-card__overlay">
                      <h3 className="job-intro-card__title">{job.title}</h3>
                      <p className="job-intro-card__summary">{job.summary}</p>
                      <div className="job-intro-card__actions">
                        {(Object.keys(JOB_INTRO_SECTION_LABEL) as JobIntroSectionKey[]).map((key) => (
                          <button
                            key={key}
                            type="button"
                            className="job-intro-card__btn"
                            onClick={() => openSection(job, key)}
                          >
                            {JOB_INTRO_SECTION_LABEL[key]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {dialog ? (
        <div
          className="job-intro-modal"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="job-intro-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
          >
            <div className="job-intro-modal__head">
              <p className="job-intro-modal__eyebrow">{modalSectionLabel}</p>
              <h4 id={dialogTitleId} className="job-intro-modal__title">
                {dialog.job.title}
              </h4>
              <p className="job-intro-modal__intro">{sectionIntro}</p>
              <button
                ref={closeBtnRef}
                type="button"
                className="job-intro-modal__close"
                onClick={close}
              >
                닫기
              </button>
            </div>
            <div className="job-intro-modal__toolbar" role="group" aria-label={`${dialog.job.title} 세부 항목`}>
              {(Object.keys(JOB_INTRO_SECTION_LABEL) as JobIntroSectionKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={
                    dialog.section === key
                      ? "job-intro-modal__tab job-intro-modal__tab--active"
                      : "job-intro-modal__tab"
                  }
                  onClick={() => setDialog({ job: dialog.job, section: key })}
                  aria-pressed={dialog.section === key}
                >
                  {JOB_INTRO_SECTION_LABEL[key]}
                </button>
              ))}
            </div>
            <div className="job-intro-modal__body">
              {hasSplitSections(dialog.job) ? (
                <div className="job-intro-modal__splits">
                  {dialog.job.splits.map((block) => (
                    <section
                      key={block.label}
                      className="job-intro-modal__split"
                      aria-labelledby={`job-intro-split-${dialog.job.id}-${block.label === "인사" ? "hr" : "ga"}`}
                    >
                      <h5
                        id={`job-intro-split-${dialog.job.id}-${block.label === "인사" ? "hr" : "ga"}`}
                        className="job-intro-modal__split-title"
                      >
                        {block.label}
                      </h5>
                      <ul className="job-intro-modal__list">
                        {splitSectionBody(block, dialog.section).map((line) => (
                          <li key={`${block.label}-${line}`}>{line}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              ) : (
                <ul className="job-intro-modal__list">
                  {sectionBody(dialog.job, dialog.section).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
