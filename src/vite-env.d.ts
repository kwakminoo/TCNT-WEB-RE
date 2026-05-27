/// <reference types="vite/client" />

declare module "*.svg?raw" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly VITE_KAKAO_MAP_APP_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
