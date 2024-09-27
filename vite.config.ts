import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@apis", replacement: path.resolve(__dirname, "src/apis") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@router", replacement: path.resolve(__dirname, "src/router") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
    ],
  },
});
