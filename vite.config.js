import { defineConfig } from "vite";

export default defineConfig({
  envPrefix: "VITE_",

  css: {
    preprocessorOptions: {
      scss: {},
    },
  },

  test: {
    globals: true,
    include: ["./tests/**/*.test.js"],
  },
});
