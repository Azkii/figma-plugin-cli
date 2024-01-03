import {
  existsSync,
  rmSync,
  readdirSync,
  statSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import { join } from "node:path";
import { resolve } from "node:path";

export const emptyDir = (path: string) => {
  if (!existsSync(path)) return;
  for (const file of readdirSync(path)) {
    rmSync(resolve(path, file), { recursive: true, force: true });
  }
};

export const isDirEmpty = (path: string) => {
  const files = readdirSync(path);
  return files.length === 0;
};

export const copyContentToDirectory = (copyFrom: string, copyInto: string) => {
  const templateDirectory = readdirSync(copyFrom);

  templateDirectory.forEach((file) => {
    const origFilePath = join(copyFrom, file);
    const stats = statSync(origFilePath);

    if (stats.isFile()) {
      const contents = readFileSync(origFilePath, "utf8");
      writeFileSync(join(copyInto, file), contents, "utf8");
    }

    if (stats.isDirectory()) {
      mkdirSync(join(copyInto, file));
      copyContentToDirectory(join(copyFrom, file), join(copyInto, file));
    }
  });
};
