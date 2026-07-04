import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react/")) return "react";
            if (id.includes("react-router-dom")) return "router";
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("@supabase")) return "supabase";
            if (id.includes("lucide-react")) return "icons";
          }
        },
      },
    },
  },
  base: '/kfdmotors/'
});