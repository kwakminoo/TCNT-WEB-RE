import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { EmailCollectionLayout } from "../components/page/EmailCollectionLayout";
import { SubpageShell } from "../components/SubpageShell";

export function EmailCollectionPage() {
  return (
    <SubpageShell
      className="page-shell--legal-email"
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">이메일무단수집거부</h1>
        </>
      }
    >
      <EmailCollectionLayout />
    </SubpageShell>
  );
}
