import {AlignmentType, TableRow, WidthType} from 'docx';
import {TextRun} from 'docx';
import {Paragraph} from 'docx';
import {TableCell} from 'docx';

const SolutionTableHeaderCells = (length: number = 6) => {
  const cells: TableCell[] = [];

  Array.from({length}).forEach((_, j) => {
    const isFirst = j === 0;
    const isLast = j === length - 1;

    const noWidth = 5.5;
    const calWidth = length === 1 ? 0 : (100 - noWidth) / (length - 1);

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
            size: isFirst ? borderThickness : 0,
            style: 'single',
          },
          right: {
            size: isLast ? borderThickness : 0,
            style: 'single',
          },
        },
      })
    );
  });

  return new TableRow({children: cells});
};

export default SolutionTableHeaderCells;
