import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";
import rollup from "rollup";
import esbuild from "rollup-plugin-esbuild";

const bundleController = {
  name: "rollup-bundle-controller",
  async writeBundle() {
    const controllerConfig = {
      input: "./controller/controller.js",
      output: {
        entryFileNames: "[name].js",
        dir: "./dist",
      },
      plugins: [esbuild({ minify: true })],
    };

    rollup.watch(controllerConfig);
    const bundle = await rollup.rollup(controllerConfig);
    await bundle.write(controllerConfig.output);
  },
};

export default defineConfig({
  plugins: [viteSingleFile(), react(), bundleController],
  root: "./ui",
  build: {
    outDir: "../dist",
    minify: "esbuild",
    emptyOutDir: true,
  },
});
