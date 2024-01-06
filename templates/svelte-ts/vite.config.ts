import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import tsconfigPaths from "vite-tsconfig-paths";

export default () => {
  return defineConfig({
    plugins: [svelte(), viteSingleFile(), tsconfigPaths()],
    root: "./ui-app",
    build: {
      outDir: "../dist",
    },
  });
};
