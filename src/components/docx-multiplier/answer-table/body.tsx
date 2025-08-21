import {
  VerticalAlign,
  AlignmentType,
  TableCell,
  Paragraph,
  WidthType,
  TableRow,
  TextRun,
} from 'docx';

const AnswerTableBodyCells = (answers: number[], rowsPerTable: number) => {
  const rows: TableRow[] = [];
  
  for (let i = 0; i < Math.ceil(answers.length / 5); i++) {
    const rowAnswers = answers.slice(i * 5, (i + 1) * 5);
    
    const cells = rowAnswers.map((answer, idx) => 
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${i * 5 + idx + 1}. ${answer}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
        ],
        width: {type: WidthType.PERCENTAGE, size: 20},
        verticalAlign: VerticalAlign.CENTER,
      })
    );

    // Fill remaining cells if needed
    while (cells.length < 5) {
      cells.push(
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({text: '', size: 20})],
            }),
          ],
          width: {type: WidthType.PERCENTAGE, size: 20},
          verticalAlign: VerticalAlign.CENTER,
        })
      );
    }

    rows.push(
      new TableRow({
        height: {rule: 'atLeast', value: 400},
        children: cells,
      })
    );
  }

  return rows;
};

export default AnswerTableBodyCells;
