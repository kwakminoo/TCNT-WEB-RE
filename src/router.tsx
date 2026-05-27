import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { pagesByPath } from "./content/pagesData";
import { HomePage } from "./pages/HomePage";
import { ProjectMapPage } from "./pages/ProjectMapPage";
import { NotFound } from "./pages/NotFound";
import { SearchPage } from "./pages/SearchPage";
import { SiteMapPage } from "./pages/SiteMapPage";
import { StaticPage } from "./pages/StaticPage";
import { ProjectPortfolioPage } from "./pages/ProjectPortfolioPage";
import { ProjectOrderDetailPage } from "./pages/ProjectOrderDetailPage";
import { PrNewsListPage } from "./pages/PrNewsListPage";
import { PrNewsDetailPage } from "./pages/PrNewsDetailPage";
import { YoutubePage } from "./pages/YoutubePage";
import { SocialContributionListPage } from "./pages/SocialContributionListPage";
import { SocialContributionDetailPage } from "./pages/SocialContributionDetailPage";
import { PrMaterialsListPage } from "./pages/PrMaterialsListPage";
import { InnovationNewsListPage } from "./pages/InnovationNewsListPage";
import { InnovationNewsDetailPage } from "./pages/InnovationNewsDetailPage";
import { EsgPage } from "./pages/EsgPage";
import { CareerJobDetailPage } from "./pages/CareerJobDetailPage";
import { LocationPage } from "./pages/LocationPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { EmailCollectionPage } from "./pages/EmailCollectionPage";

function appBasename(): string {
  const b = import.meta.env.BASE_URL ?? "/";
  if (b === "./" || b === ".") return "/";
  return b.length > 1 && b.endsWith("/") ? b.slice(0, -1) : b;
}

const STATIC_ROUTE_EXCLUDE = new Set([
  "/site-map",
  "/business/project-map",
  "/business/orders",
  "/pr/news",
  "/pr/youtube",
  "/pr/social",
  "/pr/materials",
  "/innovation/news",
  "/esg",
  "/about/location",
  "/legal/privacy",
  "/legal/email-collection",
]);

const staticRoutes = Object.keys(pagesByPath)
  .filter((p) => !STATIC_ROUTE_EXCLUDE.has(p))
  .map((fullPath) => ({
    path: fullPath.replace(/^\//, ""),
    element: <StaticPage />,
  }));

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "search", element: <SearchPage /> },
        { path: "site-map", element: <SiteMapPage /> },
        { path: "business/orders", element: <ProjectPortfolioPage /> },
        { path: "business/orders/:slug", element: <ProjectOrderDetailPage /> },
        { path: "pr/news", element: <PrNewsListPage /> },
        { path: "pr/news/:slug", element: <PrNewsDetailPage /> },
        { path: "pr/youtube", element: <YoutubePage /> },
        { path: "pr/social", element: <SocialContributionListPage /> },
        { path: "pr/social/:slug", element: <SocialContributionDetailPage /> },
        { path: "pr/materials", element: <PrMaterialsListPage /> },
        { path: "innovation/news", element: <InnovationNewsListPage /> },
        { path: "innovation/news/:id", element: <InnovationNewsDetailPage /> },
        { path: "esg", element: <EsgPage /> },
        { path: "career/jobs/:id", element: <CareerJobDetailPage /> },
        { path: "business/project-map", element: <ProjectMapPage /> },
        { path: "about/location", element: <LocationPage /> },
        { path: "legal/privacy", element: <PrivacyPolicyPage /> },
        { path: "legal/email-collection", element: <EmailCollectionPage /> },
        ...staticRoutes,
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { basename: appBasename() },
);
