import {AlignmentType, TableRow, WidthType} from 'docx';
import {TextRun} from 'docx';
import {Paragraph} from 'docx';
import {TableCell} from 'docx';

import {Solutions} from '../../../store/type';
import {SIZES} from '../shared/const';

const SolutionTableBody = (
  solutions: Solutions[],
  includeComma: boolean,
  length: number = 10,
  colLength: number = 6
) => {
  const makeRow = (rowOrd: number) => {
    const cells: TableCell[] = [];

    Array.from({length: colLength}).forEach((_, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === colLength - 1;

      const targetSolution = solutions.at((idx - 1) % (colLength - 1));
      const targetNumber = includeComma
        ? targetSolution?.numbers[rowOrd].toLocaleString()
        : targetSolution?.numbers[rowOrd].toString();

      cells.push(
        new TableCell({
          children: [
            new Paragraph({
              children: [
                isFirst
                  ? new TextRun({
                      text: rowOrd.toString(),
                      size: SIZES.font.numbering,
                    })
                  : new TextRun({
                      text: targetNumber,
                      size: SIZES.font.solution,
                      italics: true,
                      font: SIZES.family.solution,
                      characterSpacing: 70,
                    }),
              ],
              alignment: isFirst ? AlignmentType.CENTER : AlignmentType.RIGHT,
            }),
          ],
          width: isFirst
            ? {size: SIZES.columns.width.first, type: WidthType.PERCENTAGE}
            : {
                size: SIZES.columns.width.childColumn(colLength),
                type: WidthType.PERCENTAGE,
              },
          verticalAlign: 'center',
          borders: {
            left: {
              size: isFirst ? SIZES.border.single : undefined,
              style: isFirst ? 'single' : 'none',
            },
            top: {
              size: SIZES.border.single,
              style: 'none',
            },
            right: {
              size: isLast ? SIZES.border.single : undefined,
              style: isLast ? 'single' : 'none',
            },
            bottom: {
              size: SIZES.border.single,
              style: 'none',
            },
          },
        })
      );
    });

    return new TableRow({
      children: cells,
      height: {rule: 'atLeast', value: SIZES.columns.height.solution},
    });
  };

  return Array.from({length}).map((_, i) => makeRow(i));
};

export default SolutionTableBody;
