import {
  TableRow,
  TableCell,
  Paragraph,
  TextRun,
  WidthType,
  VerticalAlign,
  AlignmentType,
} from 'docx';

const SolutionTableHeaderCells = () => {
  return new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: '문제',
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        width: {type: WidthType.PERCENTAGE, size: 70},
        verticalAlign: VerticalAlign.CENTER,
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: '답',
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        width: {type: WidthType.PERCENTAGE, size: 30},
        verticalAlign: VerticalAlign.CENTER,
      }),
    ],
  });
};

export default SolutionTableHeaderCells;
