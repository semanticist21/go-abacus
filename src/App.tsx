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

const makeTableHeader = (rows: TableRow[], length: number = 6) => {
  const cells: TableCell[] = [];

  Array.from({length}).forEach((_, j) => {
    const isFirst = j === 0;

    const noWidth = 6;
    const calWidth = length === 1 ? 0 : (100 - noWidth) / (length - 1);

    const margin = 25;
    const fontSize = 24;

    const borderThickness = 15;

    cells.push(
      new TableCell({
        children: [
          new Paragraph({
            children: [
              isFirst
                ? new TextRun({text: 'No.', bold: true, size: fontSize})
                : new TextRun({text: j.toString(), size: fontSize}),
            ],
            alignment: isFirst ? AlignmentType.LEFT : AlignmentType.CENTER,
          }),
        ],
        width: isFirst
          ? {size: noWidth, type: WidthType.PERCENTAGE}
          : {size: calWidth, type: WidthType.PERCENTAGE},
        borders: {
          top: {
            size: borderThickness,
            style: 'single',
          },
          left: {
            size: borderThickness,
            style: 'single',
          },
          right: {
            size: borderThickness,
            style: 'single',
          },
        },
      })
    );
  });

  rows.push(new TableRow({children: cells}));
};

const generateHeader = (text: string) => {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text,
            bold: true,
            color: '000000',
            size: 20,
          }),
        ],
      }),
    ],
  });
};

const writeSolutionAsync = async () => {
  const createTable = () => {
    const rows: TableRow[] = [];
    Array.from({length: 12}).forEach((_, i) => {
      const cells: TableCell[] = [];

      // in case of header
      // TODO
      if (i === 0) {
        makeTableHeader(rows);
      }
    });

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
          default: generateHeader('주산암산-2자리'),
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'LEVEL 2',
                bold: true,
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          spacer(),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: '주산암산',
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    borders: {
                      right: {
                        style: 'double',
                      },
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: '점',
                            bold: true,
                            size: 20,
                          }),
                        ],
                        alignment: AlignmentType.RIGHT,
                        spacing: {
                          line: 360,
                          lineRule: 'auto',
                        },
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 15,
                      type: WidthType.PERCENTAGE,
                    },
                    borders: {
                      left: {
                        style: 'double',
                      },
                      right: {
                        style: 'double',
                      },
                      top: {
                        style: 'double',
                      },
                      bottom: {
                        style: 'double',
                      },
                    },
                  }),
                ],
              }),
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            borders: {
              bottom: {
                style: 'none',
              },
              top: {
                style: 'none',
              },
              left: {
                style: 'none',
              },
              right: {
                style: 'none',
              },
            },
          }),

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
