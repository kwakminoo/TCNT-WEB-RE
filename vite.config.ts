import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, "");
  const kakaoMapKey = env.VITE_KAKAO_MAP_APP_KEY?.trim();

  return {
    base: "./",
    plugins: [
      react(),
      {
        name: "html-kakao-map-sdk",
        transformIndexHtml(html) {
          if (!kakaoMapKey) return html;
          const src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(kakaoMapKey)}&autoload=false&libraries=services`;
          return html.replace(
            "</head>",
            `    <script defer src="${src}" data-kakao-map-sdk="true"></script>\n  </head>`,
          );
        },
      },
    ],
    server: {
      fs: {
        allow: [
          rootDir,
          "C:/Users/kwakm/.cursor/projects/c-Users-kwakm-OneDrive-Desktop-Cusor-Project-TNC-Web-Re/assets",
        ],
      },
    },
  };
});
