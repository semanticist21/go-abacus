import {join, resolve, resourceDir} from '@tauri-apps/api/path';
import {mkdir, readDir, writeFile} from '@tauri-apps/plugin-fs';

export const getCurrentResourceDir = async () => {
  const resDir = await resourceDir();

  return await resolve(resDir, 'data');
};

const _getFullPathWithCreation = async (filename: string) => {
  const publicDir = await getCurrentResourceDir();

  try {
    await readDir(publicDir);
  } catch (error) {
    await mkdir(publicDir, {recursive: true});
  }

  return await join(publicDir, filename);
};

export const saveFile = async (arrayBuffer: ArrayBuffer, filename: string) => {
  const uint8Array = new Uint8Array(arrayBuffer);
  const fullPath = await _getFullPathWithCreation(filename);

  await writeFile(fullPath, uint8Array);
};

export const saveFileBlob = async (blob: Blob, savePath: string) => {
  const uint8Array = new Uint8Array(await blob.arrayBuffer());

  await writeFile(savePath, uint8Array);
};
