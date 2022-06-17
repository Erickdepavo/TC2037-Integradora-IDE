import { readdir, stat, readFile } from "fs/promises";
import { resolve } from "path";

let currentDirectory: string | null = null;

async function getFiles(dir: string) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return [dir].concat(files);
}

export async function getCurrentDirectory() {

  if (!currentDirectory) {
    currentDirectory = null;
    return null;
  }

  return await getFiles(currentDirectory);;
}

export async function setCurrentDirectory(newDirectory: string | null) {
  currentDirectory = newDirectory;
  return await getCurrentDirectory();
}


export async function getFile(path: string): Promise<string> {
  return readFile(path, { encoding: 'utf-8' });
}
