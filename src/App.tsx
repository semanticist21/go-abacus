import {
  AlignmentType,
  BorderStyle,
  Document,
  Header,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';
import {useEffect} from 'react';

import './App.css';
import {saveFileBlob} from './util/fs';
import pageDescRow from './widget/page-desc-row';
import PageHeader from './widget/page-header';
import pageTitle from './widget/page-title';
import SolutionTableBody from './widget/solution-table-body';
import SolutionTableHeaderCells from './widget/solution-table-header';

const writeSolutionAsync = () => {
  const createTable = () => {
    const rows: TableRow[] = [];

    rows.push(SolutionTableHeaderCells());
    SolutionTableBody().forEach((row) => rows.push(row));

    return new Table({
      rows: rows,
      width: {size: 100, type: WidthType.PERCENTAGE},
    });
  };

  const spacer = () => {
    return new Paragraph({
      spacing: {
        after: 100,
      },
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
          spacer(),
          pageDescRow('주산암산'),

          spacer(),

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
