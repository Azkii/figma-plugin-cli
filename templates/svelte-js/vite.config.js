import { watch, rollup } from "rollup";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { svelte } from "@sveltejs/vite-plugin-svelte";
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

    watch(controllerConfig);
    const bundle = await rollup(controllerConfig);
    await bundle.write(controllerConfig.output);
  },
};

export default defineConfig({
  plugins: [svelte(), viteSingleFile(), bundleController],
  root: "./ui",
  build: {
    outDir: "../dist",
    minify: "esbuild",
    emptyOutDir: true,
  },
});
