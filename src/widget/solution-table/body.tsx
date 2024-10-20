import {AlignmentType, TableRow, WidthType} from 'docx';
import {TextRun} from 'docx';
import {Paragraph} from 'docx';
import {TableCell} from 'docx';

const SolutionTableBody = (length: number = 10, colLength: number = 6) => {
  const makeRow = (rowOrd: number) => {
    const cells: TableCell[] = [];

    Array.from({length: colLength}).forEach((_, j) => {
      const isFirst = j === 0;
      const isLast = j === colLength - 1;

      const noWidth = 5.5;
      const calWidth = length === 1 ? 0 : (100 - noWidth) / (length - 1);

      const numberingFontSize = 24;
      const solutionFontSize = 24;

      const borderThickness = 15;

      cells.push(
        new TableCell({
          children: [
            new Paragraph({
              children: [
                isFirst
                  ? new TextRun({
                      text: rowOrd.toString(),
                      size: numberingFontSize,
                    })
                  : new TextRun({
                      text: `${Math.random() < 0.5 ? '-' : ''}${(
                        Math.random() * 100
                      ).toFixed(0)}`,
                      size: solutionFontSize,
                      italics: true,
                      font: 'Helvetica Neue Light Italic',
                      characterSpacing: 70,
                    }),
              ],
              alignment: isFirst ? AlignmentType.CENTER : AlignmentType.RIGHT,
            }),
          ],
          width: isFirst
            ? {size: noWidth, type: WidthType.PERCENTAGE}
            : {size: calWidth, type: WidthType.PERCENTAGE},
          verticalAlign: 'center',
          borders: {
            left: {
              size: isFirst ? borderThickness : 0,
              style: isFirst ? 'single' : 'none',
            },
            top: {
              size: borderThickness,
              style: 'none',
            },
            right: {
              size: isLast ? borderThickness : 0,
              style: isLast ? 'single' : 'none',
            },
            bottom: {
              size: borderThickness,
              style: 'none',
            },
          },
        })
      );
    });

    return new TableRow({
      children: cells,
      height: {rule: 'atLeast', value: 312},
    });
  };

  return Array.from({length}).map((_, i) => makeRow(i + 1));
};

export default SolutionTableBody;
