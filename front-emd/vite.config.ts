import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permet d'écouter sur toutes les interfaces réseau
    port: 5173, // Port par défaut de Vite
    strictPort: true, // Ne change pas de port si 5173 est déjà pris
    hmr: {
      protocol: "ws", // Utilise le WebSocket pour le Hot Module Replacement
      host: "localhost", // Adresse de l'hôte pour le HMR
    },
  },
});
