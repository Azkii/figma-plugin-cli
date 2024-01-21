import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import rollup from "rollup";
import esbuild from "rollup-plugin-esbuild";

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

    rollup.watch(controllerConfig);
    const bundle = await rollup.rollup(controllerConfig);
    await bundle.write(controllerConfig.output);
  },
};

export default defineConfig({
  plugins: [viteSingleFile(), bundleController],
  root: "./ui",
  build: {
    outDir: "../dist",
    minify: "esbuild",
    emptyOutDir: true,
  },
});
