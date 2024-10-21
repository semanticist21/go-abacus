import {Document, Packer, Table, TableRow, WidthType} from 'docx';
import {useEffect} from 'react';

import './App.css';
import {saveFileBlob} from './util/fs';
import {breakPage} from './widget/docx/page-break';
import pageDescRow from './widget/docx/page/desc-row';
import PageHeader from './widget/docx/page/header';
import pageTitle from './widget/docx/page/title';
import SolutionTableBody from './widget/docx/solution-table/body';
import SolutionTableFooterCells from './widget/docx/solution-table/footer';
import SolutionTableHeaderCells from './widget/docx/solution-table/header';
import spacer from './widget/docx/spacer';
import MainPage from './widget/main-page/page';

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

  return <MainPage />;
};

export default App;
