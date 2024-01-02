import { existsSync, rmSync, readdirSync } from "node:fs";
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
