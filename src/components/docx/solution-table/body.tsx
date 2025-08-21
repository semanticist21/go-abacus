import {AlignmentType, Paragraph, TableCell, WidthType, TableRow, TextRun} from 'docx';
import {addDotSeparate} from '../../../util/add-dot-separate';
import {formatDigitNumber} from '../../../util/format-digit';
import {Solutions, Options} from '../../../pages/main/type';
import {SIZES} from '../shared/const';

const SolutionTableBody = (
  solutions: Solutions[],
  options: Options,
  length: number = 10,
  colLength: number = 6
) => {
  const makeRow = (rowOrd: number) => {
    const cells: TableCell[] = [];

    Array.from({length: colLength}).forEach((_, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === colLength - 1;

      const targetSolution = solutions.at((idx - 1) % (colLength - 1));
      const targetNumber = targetSolution!.numbers[rowOrd];

      const digitFormattedNumber = options.is_decimal
        ? formatDigitNumber(targetNumber ?? 0, options.digit)
        : targetNumber;

      const formattedNumber = options.include_comma
        ? addDotSeparate(digitFormattedNumber.toString())
        : digitFormattedNumber.toString();

      const spacing = options.digit >= 4 ? 30 : options.digit === 3 ? 50 : 70;

      cells.push(
        new TableCell({
          children: [
            new Paragraph({
              children: [
                isFirst
                  ? new TextRun({
                      text: (rowOrd + 1).toString(),
                      size: SIZES.font.numbering,
                    })
                  : new TextRun({
                      font: SIZES.family.solution,
                      characterSpacing: spacing,
                      size: SIZES.font.solution,
                      text: formattedNumber,
                      italics: true,
                    }),
              ],
              alignment: isFirst ? AlignmentType.CENTER : AlignmentType.RIGHT,
            }),
          ],
          borders: {
            left: {
              size: isFirst ? SIZES.border.single : undefined,
              style: isFirst ? 'single' : 'none',
            },
            right: {
              size: isLast ? SIZES.border.single : undefined,
              style: isLast ? 'single' : 'none',
            },
            bottom: {
              size: SIZES.border.single,
              style: 'none',
            },
            top: {
              size: SIZES.border.single,
              style: 'none',
            },
          },
          width: isFirst
            ? {size: SIZES.columns.width.first, type: WidthType.PERCENTAGE}
            : {
                size: SIZES.columns.width.childColumn(colLength),
                type: WidthType.PERCENTAGE,
              },
          verticalAlign: 'center',
        })
      );
    });

    return new TableRow({
      height: {value: SIZES.columns.height.solution, rule: 'atLeast'},
      children: cells,
    });
  };

  return Array.from({length}).map((_, i) => makeRow(i));
};

export default SolutionTableBody;
