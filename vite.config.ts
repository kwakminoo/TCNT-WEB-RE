import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    fs: {
      allow: [
        "C:/Users/kwakm/OneDrive/Desktop/Cusor-Project/TNC Web Re",
        "C:/Users/kwakm/.cursor/projects/c-Users-kwakm-OneDrive-Desktop-Cusor-Project-TNC-Web-Re/assets",
      ],
    },
  },
});
