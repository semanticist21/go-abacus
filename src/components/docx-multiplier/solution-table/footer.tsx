import {
  VerticalAlign,
  AlignmentType,
  TableCell,
  Paragraph,
  WidthType,
  TableRow,
  TextRun,
} from 'docx';

const SolutionTableFooterCells = () => {
  return new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: '',
                size: 20,
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
                text: '',
                size: 20,
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

export default SolutionTableFooterCells;
