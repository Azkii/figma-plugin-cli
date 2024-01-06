# Figma Plugin - Svelte TypeScript

## Introduction

This repository serves as a template for kickstarting your own Figma plugin development using Svelte and TypeScript. Use this template as a foundation for building your custom Figma plugin. The structure includes essential configurations and a minimal setup to help you get started quickly.
Feel free to explore the codebase, customize it according to your needs, and contribute to its enhancement.

## Getting Started

To get started with the development or testing of this Figma plugin, follow the steps below:

1. **Install dependencies:**
   
   ```bash
   npm install
   ```
   
2. **Run the development server:**
   
   ```bash
   npm run watch
   ```

3. **Open Figma and load the plugin:**
  - Open Figma.
  - Go to the Plugins menu.
  - Select 'Development' and choose 'Create a plugin...'
  - Choose 'Link existing plugin' and select the manifest.json file in the public directory of this repository.

## Available Scripts
- `watch`: Concurrently runs the Vite development server, and TypeScript and Terser for automatic code compilation and minification.
- `web`: Starts the Vite development server.
- `ui-build`: Builds the UI using Vite in watch mode.
- `controller-build`: Builds the TypeScript controller and minifies it using Terser.
