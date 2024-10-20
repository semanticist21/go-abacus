import {AlignmentType, TableRow, WidthType} from 'docx';
import {TextRun} from 'docx';
import {Paragraph} from 'docx';
import {TableCell} from 'docx';

const SolutionTableFooterCells = (length: number = 6) => {
  const cells: TableCell[] = [];

  Array.from({length}).forEach((_, j) => {
    const isFirst = j === 0;
    const isLast = j === length - 1;

    const noWidth = 5.5;
    const calWidth = length === 1 ? 0 : (100 - noWidth) / (length - 1);

    const firstFontSize = 24;
    const otherFontSize = 32;

    const borderThickness = 15;

    cells.push(
      new TableCell({
        children: [
          new Paragraph({
            children: [
              isFirst
                ? new TextRun({text: '計', size: firstFontSize})
                : new TextRun({text: '', size: otherFontSize}),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        width: isFirst
          ? {size: noWidth, type: WidthType.PERCENTAGE}
          : {size: calWidth, type: WidthType.PERCENTAGE},
        borders: {
          bottom: {
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

export default SolutionTableFooterCells;
