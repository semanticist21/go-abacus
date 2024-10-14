import {fs, path} from '@tauri-apps/api';
import {renderAsync} from 'docx-preview';
import {useEffect} from 'react';

import './App.css';

async function saveFile(arrayBuffer: ArrayBuffer, filename: string) {
  const resourceDir = await path.resourceDir();

  const publicDir = await path.resolve(resourceDir, 'public/docx');

  // generates a path to the file if not exists
  try {
    await fs.readDir(publicDir);
  } catch (error) {
    await fs.createDir(publicDir, {recursive: true});
  }

  // Convert ArrayBuffer to a Uint8Array and then to a base64 string
  const uint8Array = new Uint8Array(arrayBuffer);
  const fullPath = await path.join(publicDir, filename);

  // Write the base64 data to the file
  await fs.writeBinaryFile(fullPath, uint8Array);
}

async function renderSavedFile(filename: string) {
  const resourceDir = await path.resourceDir();
  const publicDir = await path.resolve(resourceDir, 'public/docx');

  const fullPath = await path.join(publicDir, filename);

  // Read the file as binary
  const savedFileBuffer = await fs.readBinaryFile(fullPath);
  const el = document.getElementById('container')!;
  await renderAsync(savedFileBuffer, el);
}

const fetchDocxThenSave = async () => {
  const docx = await fetch('example.docx');
  const arrayBuffer = await docx.arrayBuffer();
  // await saveFile(arrayBuffer, 'solutions.docx');

  // renderSavedFile('solutions.docx');
};

const App = () => {
  useEffect(() => {
    fetchDocxThenSave();
  }, []);

  return <div id="container" className="size-8 bg-red-500 text-green-400" />;
};

export default App;
