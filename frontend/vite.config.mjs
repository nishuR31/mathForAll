import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
export default defineConfig({
  build: {
    outDir: "dist",
    base: "/",

    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "5173",
  },
});

// https://vitejs.dev/config/
// export default defineConfig({
//   // This changes the out put dir from dist to build
//   // comment this out if that isn't relevant for your project
//   build: {
//     outDir: "build",
//      base: "/",
//     chunkSizeWarningLimit: 2000,
//   },
//   plugins: [tsconfigPaths(), react(), tagger()],
//   server: {
//     port: "5173",
//     proxy: {
//       "/api": {
//         target: "http://localhost:4029",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
//       },
//     },
//   },
// });

// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";
// import tsconfigPaths from "vite-tsconfig-paths";
// import tagger from "@dhiwise/component-tagger";

// export default defineConfig(({ mode }) => {
//   process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

//   return {
//     build: {
//       outDir: "build",
//       chunkSizeWarningLimit: 2000,
//     },
//     plugins: [tsconfigPaths(), react(), tagger()],
//     server: {
//       port: "4028",
//       host: "0.0.0.0",
//       strictPort: true,
//       allowedHosts: [".amazonaws.com", ".builtwithrocket.new"],
//     },
//   };
// });
