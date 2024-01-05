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

interface Options {
  renameFiles?: { [oldName: string]: string };
}

/**
 * Options for customizing the behavior of the copyContentToDirectory function.
 * @property {Object.<string, string>} [renameFiles] - A mapping of old file names to new file names for renaming files during the copy process.
 *   This should be structured like: { [oldName: string]: string }, where each key represents the old file name and the corresponding value is the new file name to replace it.
 */

/**
 * Recursively copies the content of a directory to another directory, with optional file renaming.
 * @param {string} copyFrom - The source directory to copy from.
 * @param {string} copyInto - The target directory to copy into.
 * @param {Options} [options={}] - Additional options for customizing the copy process.
 */

/**
 * Example usage:
 * @example
 * copyContentToDirectory(templateDir, targetDir, {
 *   renameFiles: { _gitignore: ".gitignore" },
 * });
 */

export const copyContentToDirectory = (
  copyFrom: string,
  copyInto: string,
  options: Options = {}
) => {
  const templateDirectory = readdirSync(copyFrom);
  const { renameFiles } = options;

  templateDirectory.forEach((file) => {
    const originalFilePath = join(copyFrom, file);
    const stats = statSync(originalFilePath);

    if (stats.isFile()) {
      const contents = readFileSync(originalFilePath, "utf8");
      const newName = renameFiles?.[file] ? renameFiles[file] : file;
      writeFileSync(join(copyInto, newName), contents, "utf8");
    }

    if (stats.isDirectory()) {
      mkdirSync(join(copyInto, file));
      copyContentToDirectory(
        join(copyFrom, file),
        join(copyInto, file),
        options
      );
    }
  });
};

export const editFile = (
  filePath: string,
  callback: (content: string) => string
) => {
  const content = readFileSync(filePath, "utf-8");
  writeFileSync(filePath, callback(content), "utf-8");
};
