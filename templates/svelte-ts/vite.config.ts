import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { watch, rollup } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const bundleController = {
  name: "rollup-bundle-controller",
  async writeBundle() {
    const controllerConfig = {
      input: "./controller/controller.ts",
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
  plugins: [viteSingleFile(), svelte(), bundleController],
  root: "./ui",
  build: {
    outDir: "../dist",
    minify: "esbuild",
    emptyOutDir: true,
  },
});
