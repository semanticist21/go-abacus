import {
  AlignmentType,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';

import {SIZES} from '../shared/const';

const pageDescRow = (text: string) => {
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text,
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
                indent: {
                  right: 100,
                },
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
                size: SIZES.border.double,
                style: 'double',
              },
              right: {
                size: SIZES.border.double,
                style: 'double',
              },
              top: {
                size: SIZES.border.double,
                style: 'double',
              },
              bottom: {
                size: SIZES.border.double,
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
  });
};

export default pageDescRow;
