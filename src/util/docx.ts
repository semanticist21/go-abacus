import {fs, path} from '@tauri-apps/api';
import {renderAsync} from 'docx-preview';

export async function renderSavedFile(filename: string, el: HTMLElement) {
  const resourceDir = await path.resourceDir();
  const publicDir = await path.resolve(resourceDir, 'data');

  const fullPath = await path.join(publicDir, filename);

  // read the file as binary
  const savedFileBuffer = await fs.readBinaryFile(fullPath);
  await renderAsync(savedFileBuffer, el);
}
