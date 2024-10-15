import {fs, path} from '@tauri-apps/api';

const _getFullPathWithCreation = async (filename: string) => {
  const resourceDir = await path.resourceDir();

  const publicDir = await path.resolve(resourceDir, 'data');

  try {
    await fs.readDir(publicDir);
  } catch (error) {
    await fs.createDir(publicDir, {recursive: true});
  }

  return await path.join(publicDir, filename);
};

export const saveFile = async (arrayBuffer: ArrayBuffer, filename: string) => {
  const uint8Array = new Uint8Array(arrayBuffer);
  const fullPath = await _getFullPathWithCreation(filename);

  await fs.writeBinaryFile(fullPath, uint8Array);
};

export const saveFileBlob = async (blob: Blob, filename: string) => {
  const uint8Array = new Uint8Array(await blob.arrayBuffer());
  const fullPath = await _getFullPathWithCreation(filename);

  await fs.writeBinaryFile(fullPath, uint8Array);
};
