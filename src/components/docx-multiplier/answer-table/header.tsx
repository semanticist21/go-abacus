import {
  TableRow,
  TableCell,
  Paragraph,
  TextRun,
  WidthType,
  VerticalAlign,
  AlignmentType,
} from 'docx';

const AnswerTableHeaderCells = (title: string) => {
  return new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${title} 정답`,
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        width: {type: WidthType.PERCENTAGE, size: 100},
        verticalAlign: VerticalAlign.CENTER,
      }),
    ],
  });
};

export default AnswerTableHeaderCells;
