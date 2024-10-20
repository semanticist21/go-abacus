import {Document, Packer, Table, TableRow, WidthType} from 'docx';
import {useEffect} from 'react';

import './App.css';
import {saveFileBlob} from './util/fs';
import {breakPage} from './widget/page-break';
import pageDescRow from './widget/page/desc-row';
import PageHeader from './widget/page/header';
import pageTitle from './widget/page/title';
import SolutionTableBody from './widget/solution-table/body';
import SolutionTableFooterCells from './widget/solution-table/footer';
import SolutionTableHeaderCells from './widget/solution-table/header';
import spacer from './widget/spacer';

const createPages = () => {
  const createTable = () => {
    const rows: TableRow[] = [];

    rows.push(SolutionTableHeaderCells());
    SolutionTableBody().forEach((row) => rows.push(row));
    rows.push(SolutionTableFooterCells());

    return new Table({
      rows: rows,
      width: {size: 100, type: WidthType.PERCENTAGE},
    });
  };

  return new Document({
    sections: [
      {
        headers: {
          default: PageHeader('주산암산-2자리'),
        },
        children: [
          pageTitle('LEVEL 2'),
          spacer(100),
          pageDescRow('주산암산'),

          spacer(100),

          createTable(),
          spacer(0),
          createTable(),
          spacer(0),
          createTable(),
          breakPage(),

          pageTitle(''),
          spacer(100),
          pageDescRow('주산암산'),

          spacer(100),

          createTable(),
          spacer(0),
          createTable(),
          spacer(0),
          createTable(),
        ],
      },
    ],
  });
};

const App = () => {
  useEffect(() => {
    const write = async () => {
      const file = createPages();
      const blob = await Packer.toBlob(file);

      saveFileBlob(blob, 'test.docx');
    };

    write();
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
