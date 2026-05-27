import { BreadcrumbNav } from "../components/BreadcrumbNav";
import { EsgLayout } from "../components/page/EsgLayout";
import { SubpageShell } from "../components/SubpageShell";

export function EsgPage() {
  return (
    <SubpageShell
      className="page-shell--esg"
      intro={
        <>
          <BreadcrumbNav />
          <h1 id="page-title">ESG경영</h1>
        </>
      }
    >
      <EsgLayout />
    </SubpageShell>
  );
}
