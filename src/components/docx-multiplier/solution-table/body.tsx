import {AlignmentType, Paragraph, TableCell, WidthType, TableRow, TextRun} from 'docx';
import {MultiplySolutions, MultiplyOptions} from '../../../pages/multiply/type';
import {addDotSeparate} from '../../../util/add-dot-separate';
import {formatDigitNumber} from '../../../util/format-digit';
import {SIZES} from '../shared/const';

const SolutionTableBody = (
  solutions: MultiplySolutions[],
  options: MultiplyOptions,
  length: number = 10
) => {
  const makeRow = (rowIdx: number) => {
    if (rowIdx >= solutions.length) {
      // Empty row for spacing
      return new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({text: '', size: 20})],
              }),
            ],
            width: {type: WidthType.PERCENTAGE, size: 70},
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({text: '', size: 20})],
              }),
            ],
            width: {type: WidthType.PERCENTAGE, size: 30},
          }),
        ],
      });
    }

    const solution = solutions[rowIdx];
    const {numbers, answer} = solution;
    const {small_number, big_number, type} = numbers;

    // Format the problem text based on operation type
    let problemText = '';
    if (type === 'multiply') {
      problemText = `${big_number} × ${small_number}`;
    } else if (type === 'divide') {
      problemText = `${big_number} ÷ ${small_number}`;
    }

    return new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: problemText,
                  font: 'Arial',
                  size: 24,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          width: {type: WidthType.PERCENTAGE, size: 70},
          verticalAlign: 'center',
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: '', // Answer will be filled by user
                  size: 24,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          width: {type: WidthType.PERCENTAGE, size: 30},
          verticalAlign: 'center',
        }),
      ],
      height: {rule: 'atLeast', value: 600},
    });
  };

  return Array.from({length}).map((_, i) => makeRow(i));
};

export default SolutionTableBody;
