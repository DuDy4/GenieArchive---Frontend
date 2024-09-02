import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as fs from 'fs';
import * as path from 'path';


// const useHttps = process.env.USE_HTTPS === 'true';
const useHttps = true
console.log("useHttps: ", useHttps);
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: "src/main.tsx",
    }
  },
  plugins: [react()],
  server: {
    https: useHttps
      ? {
          key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
        }
      : undefined,
    port: 5173, 
  },
});
