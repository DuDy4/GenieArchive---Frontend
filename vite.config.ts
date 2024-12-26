import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as fs from 'fs';
import * as path from 'path';

const useHttps = 'true';
console.log("useHttps: ", useHttps);

const keyPath = path.resolve(__dirname, 'key.pem');
const certPath = path.resolve(__dirname, 'cert.pem');

const httpsConfig = useHttps && fs.existsSync(keyPath) && fs.existsSync(certPath)
  ? {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    }
  : undefined;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist'
    // rollupOptions: {
    //   input: "src/main.tsx",
    // }
  },
  plugins: [react()],
  server: {
    https: httpsConfig,
    port: 5173,
  },
});
