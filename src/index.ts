import prompts, { Answers, PromptObject } from "prompts";
import { red, trueColor } from "kolorist";
import validate from "validate-npm-package-name";
import path from "node:path";
import fs from "node:fs";
import {
  copyContentToDirectory,
  editFile,
  emptyDir,
  isDirEmpty,
} from "./helpers";

const pkgManager = "npm";
const root = process.cwd();
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
        name: "vanilla-ts",
        display: "Typescript",
        color: (text: string) => trueColor(...VARIANTS_COLORS.typescript)(text),
      },
      {
        name: "vanilla-js",
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
        name: "svelte-ts",
        display: "Typescript",
        color: (text: string) => trueColor(...VARIANTS_COLORS.typescript)(text),
      },
      {
        name: "svelte-js",
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
        name: "react-ts",
        display: "Typescript",
        color: (text: string) => trueColor(...VARIANTS_COLORS.typescript)(text),
      },
      {
        name: "react-js",
        display: "Javascript",
        color: (text: string) => trueColor(...VARIANTS_COLORS.javascript)(text),
      },
    ],
  },
];

type PromptName =
  | "name"
  | "framework"
  | "variant"
  | "overwrite"
  | "proceedWithOverwrite";

const questions: PromptObject<PromptName>[] = [
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
    type: (_, { name }) => {
      const targetDir = path.join(root, name);
      const overwriteDir = fs.existsSync(targetDir) && !isDirEmpty(targetDir);
      return overwriteDir ? "select" : null;
    },
    name: "overwrite",
    message: `Target directory is not empty. Please choose the appropriate action from the available options:`,
    initial: 0,
    choices: [
      {
        title: `Remove existing files and proceed`,
        value: "yes",
      },
      {
        title: `Cancel CLI operation`,
        value: "no",
      },
    ],
  },
  {
    type: (_, { overwrite }) => {
      if (overwrite === "no") {
        throw new Error(red("✖") + " CLI actions cancelled");
      }
      return null;
    },
    name: "proceedWithOverwrite",
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
  let response: Answers<PromptName>;
  try {
    response = await prompts(questions, {
      onCancel: () => {
        throw new Error(red("✖") + " CLI actions cancelled");
      },
    });
  } catch (err) {
    console.error(err);
    return;
  }

  const { name, framework, variant, overwrite } = response;
  const targetDir = path.join(root, name);
  const template: string = variant.name || framework.name;
  const templateDir = path.join(__dirname, "../", "templates", template);

  console.log(`Creating project template in ${targetDir}`);

  if (overwrite === "yes") {
    emptyDir(targetDir);
  } else if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  copyContentToDirectory(templateDir, targetDir, {
    renameFiles: { _gitignore: ".gitignore" },
  });

  editFile(path.join(targetDir, "package.json"), (content) => {
    const parsedContent = JSON.parse(content);
    parsedContent.name = name;
    return JSON.stringify(parsedContent, null, 2) + "\n";
  });

  editFile(path.join(targetDir, "manifest.json"), (content) => {
    const parsedContent = JSON.parse(content);
    parsedContent.name = name;
    return JSON.stringify(parsedContent, null, 2) + "\n";
  });

  console.log(`Project created. Now run:`);
  console.log(`  cd ${name}`);
  console.log(`  ${pkgManager} install`);
  console.log(`  ${pkgManager} run watch`);
}

init();
