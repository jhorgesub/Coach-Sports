import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // "host: true" equivale a "0.0.0.0" — hace que Vite escuche en todas
    // las interfaces de red del contenedor, no solo en localhost.
    // Sin esto, el browser no puede acceder a Vite corriendo en Docker.
    host: true,
    port: 5173,
  },
});
