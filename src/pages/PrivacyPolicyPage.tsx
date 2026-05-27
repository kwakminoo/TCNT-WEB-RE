import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { PrivacyPolicyLayout } from "../components/page/PrivacyPolicyLayout";
import { SubpageShell } from "../components/SubpageShell";

export function PrivacyPolicyPage() {
  return (
    <SubpageShell
      className="page-shell--legal-privacy"
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">개인정보처리방침</h1>
        </>
      }
    >
      <PrivacyPolicyLayout />
    </SubpageShell>
  );
}
