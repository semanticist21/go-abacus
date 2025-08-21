import {
  AlignmentType,
  VerticalAlign,
  Paragraph,
  TableCell,
  WidthType,
  TableRow,
  TextRun,
  Table,
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
                    bold: true,
                    text,
                  }),
                ],
              }),
            ],
            borders: {
              right: {
                style: 'double',
              },
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    bold: true,
                    text: '점',
                    size: 20,
                  }),
                ],
                spacing: {
                  lineRule: 'auto',
                  line: 360,
                },
                indent: {
                  right: 100,
                },
                alignment: AlignmentType.RIGHT,
              }),
            ],
            borders: {
              bottom: {
                size: SIZES.border.double,
                style: 'double',
              },
              right: {
                size: SIZES.border.double,
                style: 'double',
              },
              left: {
                size: SIZES.border.double,
                style: 'double',
              },
              top: {
                size: SIZES.border.double,
                style: 'double',
              },
            },
            width: {
              type: WidthType.PERCENTAGE,
              size: 15,
            },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
    ],
    borders: {
      bottom: {
        style: 'none',
      },
      right: {
        style: 'none',
      },
      left: {
        style: 'none',
      },
      top: {
        style: 'none',
      },
    },
    width: {
      type: WidthType.PERCENTAGE,
      size: 100,
    },
  });
};

export default pageDescRow;
