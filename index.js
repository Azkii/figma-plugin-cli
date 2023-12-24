#!/usr/bin/env node
import { red, trueColor } from "kolorist";
import prompts from "prompts";
import validate from "validate-npm-package-name";

const DEFAULT_PROJECT_NAME = "figma-plugin";
const FRAMEWORKS_COLORS = {
  vanilla: [240, 219, 79],
  svelte: [255, 22, 0],
  react: [97, 219, 251],
};
const VARIANTS_COLORS = {
  typescript: [0, 122, 204],
  javascript: [240, 219, 79],
};

const frameworks = [
  {
    name: "vanilla",
    display: "Vanilla",
    color: (text) => trueColor(...FRAMEWORKS_COLORS.vanilla)(text),
    variants: [
      {
        name: "vanilla-typescript",
        display: "Typescript",
        color: (text) => trueColor(...VARIANTS_COLORS.typescript)(text),
      },
      {
        name: "vanilla-javascript",
        display: "Javascript",
        color: (text) => trueColor(...VARIANTS_COLORS.javascript)(text),
      },
    ],
  },
  {
    name: "svelte",
    display: "Svelte",
    color: (text) => trueColor(...FRAMEWORKS_COLORS.svelte)(text),
    variants: [
      {
        name: "svelte-typescript",
        display: "Typescript",
        color: (text) => trueColor(...VARIANTS_COLORS.typescript)(text),
      },
      {
        name: "svelte-javascript",
        display: "Javascript",
        color: (text) => trueColor(...VARIANTS_COLORS.javascript)(text),
      },
    ],
  },
  {
    name: "react",
    display: "React",
    color: (text) => trueColor(...FRAMEWORKS_COLORS.react)(text),
    variants: [
      {
        name: "react-typescript",
        display: "Typescript",
        color: (text) => trueColor(...VARIANTS_COLORS.typescript)(text),
      },
      {
        name: "react-javascript",
        display: "Javascript",
        color: (text) => trueColor(...VARIANTS_COLORS.javascript)(text),
      },
    ],
  },
];

const questions = [
  {
    type: "text",
    name: "name",
    initial: DEFAULT_PROJECT_NAME,
    message: "Project name:",
    validate: (dirName) => {
      const { validForNewPackages, errors } = validate(dirName);
      return validForNewPackages || errors.join(", ");
    },
  },
  {
    type: "select",
    name: "framework",
    message: "Select a framework:",
    initial: 0,
    choices: frameworks.map((framework) => {
      return {
        title: framework.color(framework.display),
        value: framework,
      };
    }),
  },
  {
    type: "select",
    name: "variant",
    message: "Select a variant:",
    choices: ({ variants }) => {
      return variants.map((variant) => {
        return {
          title: variant.color(variant.display),
          value: variant,
        };
      });
    },
  },
];

async function init() {
  const response = await prompts(questions, {
    onCancel: () => {
      throw new Error(red("✖") + " CLI actions cancelled");
    },
  }).catch((err) => console.log(err.message));
}

init();
