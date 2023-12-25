import prompts, { PromptObject } from "prompts";
import validate from "validate-npm-package-name";
import { red, trueColor } from "kolorist";

const DEFAULT_PROJECT_NAME = "figma-plugin";
const FRAMEWORKS_COLORS = {
  vanilla: [240, 219, 79],
  svelte: [255, 22, 0],
  react: [97, 219, 251],
} as const;
const VARIANTS_COLORS = {
  typescript: [0, 122, 204],
  javascript: [240, 219, 79],
} as const;

interface Variant {
  name: string;
  display: string;
  color: (text: string) => string;
}

const frameworks = [
  {
    name: "vanilla",
    display: "Vanilla",
    color: (text: string) => trueColor(...FRAMEWORKS_COLORS.vanilla)(text),
    variants: [
      {
        name: "vanilla-typescript",
        display: "Typescript",
        color: (text: string) => trueColor(...VARIANTS_COLORS.typescript)(text),
      },
      {
        name: "vanilla-javascript",
        display: "Javascript",
        color: (text: string) => trueColor(...VARIANTS_COLORS.javascript)(text),
      },
    ],
  },
  {
    name: "svelte",
    display: "Svelte",
    color: (text: string) => trueColor(...FRAMEWORKS_COLORS.svelte)(text),
    variants: [
      {
        name: "svelte-typescript",
        display: "Typescript",
        color: (text: string) => trueColor(...VARIANTS_COLORS.typescript)(text),
      },
      {
        name: "svelte-javascript",
        display: "Javascript",
        color: (text: string) => trueColor(...VARIANTS_COLORS.javascript)(text),
      },
    ],
  },
  {
    name: "react",
    display: "React",
    color: (text: string) => trueColor(...FRAMEWORKS_COLORS.react)(text),
    variants: [
      {
        name: "react-typescript",
        display: "Typescript",
        color: (text: string) => trueColor(...VARIANTS_COLORS.typescript)(text),
      },
      {
        name: "react-javascript",
        display: "Javascript",
        color: (text: string) => trueColor(...VARIANTS_COLORS.javascript)(text),
      },
    ],
  },
];

const questions: PromptObject<string>[] = [
  {
    type: "text",
    name: "name",
    initial: DEFAULT_PROJECT_NAME,
    message: "Project name:",
    validate: (dirName) => {
      const { validForNewPackages, errors } = validate(dirName);
      return validForNewPackages || errors?.join(", ") || "unknown error";
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
    choices: ({ variants }: { variants: Variant[] }) => {
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
  await prompts(questions, {
    onCancel: () => {
      throw new Error(red("✖") + " CLI actions cancelled");
    },
  }).catch((err) => console.log(err.message));
}

init();
