import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { pagesByPath } from "./content/pagesData";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { SearchPage } from "./pages/SearchPage";
import { SiteMapPage } from "./pages/SiteMapPage";
import { StaticPage } from "./pages/StaticPage";

function appBasename(): string {
  const b = import.meta.env.BASE_URL ?? "/";
  if (b === "./" || b === ".") return "/";
  return b.length > 1 && b.endsWith("/") ? b.slice(0, -1) : b;
}

const staticRoutes = Object.keys(pagesByPath)
  .filter((p) => p !== "/site-map")
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
        ...staticRoutes,
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { basename: appBasename() },
);
