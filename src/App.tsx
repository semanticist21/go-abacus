import {fs, path} from '@tauri-apps/api';
import {Document, Packer, Paragraph, Table, TableCell, TableRow} from 'docx';
import {useEffect} from 'react';

import './App.css';
import {saveFile, saveFileBlob} from './util/fs';

const writeSolutionAsync = async () => {
  const resourceDir = await path.resourceDir();
  const publicDir = await path.resolve(resourceDir, 'data');

  const createTable = () => {
    const rows: TableRow[] = [];
    Array.from({length: 12}).forEach((_, i) => {
      const cells: TableCell[] = [];

      // in case of header
      // TODO
      if (true) {
        Array.from({length: 6}).forEach((_, j) => {
          cells.push(
            new TableCell({
              children: [new Paragraph(j.toString())],
            })
          );
        });

        rows.push(new TableRow({children: cells}));
      }
    });

    return new Table({rows: rows});
  };

  return new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: '4x4 Table Example',
          }),
          createTable(),
        ],
      },
    ],
  });
};

const App = () => {
  useEffect(() => {
    const writeSolution = async () => {
      const file = await writeSolutionAsync();
      const blob = await Packer.toBlob(file);

      saveFileBlob(blob, 'test.docx');
    };

    writeSolution();
  }, []);

  return (
    <div
      id="container"
      className="bg-red-500 text-green-400 min-h-dvh flex flex-col"
    >
      <header className="flex-shrink-0 bg-blue-300">header</header>
      <main className="flex-grow bg-green-500">main</main>
      <footer className="flex-shrink-0 bg-yellow-300">footer</footer>
    </div>
  );
};

export default App;
