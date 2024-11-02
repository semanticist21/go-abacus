import {AlignmentType, TableRow} from 'docx';
import {TextRun} from 'docx';
import {Paragraph} from 'docx';
import {TableCell} from 'docx';

import {SIZES} from '../shared/const';

const AnswerTableBody = (answers: number[], length: number = 3, colLength: number = 5) => {
  const makeRow = (rowOrd: number) => {
    const cells: TableCell[] = [];

    const rowAnswers = answers.slice(rowOrd * colLength, (rowOrd + 1) * colLength);

    const isLastRow = rowOrd === length - 1;

    Array.from({length: colLength}).forEach((_, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === colLength - 1;

      cells.push(
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: rowAnswers[idx].toLocaleString(),
                  size: SIZES.font.solution,
                  font: SIZES.family.solution,
                  characterSpacing: 15,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
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
              size: isLastRow ? SIZES.border.single : undefined,
              style: 'single',
            },
          },
          margins: {
            top: 100,
            bottom: 100,
          },
        })
      );
    });

    return new TableRow({
      children: cells,
      height: {rule: 'atLeast', value: SIZES.columns.height.answer},
    });
  };

  return Array.from({length}).map((_, i) => makeRow(i));
};

export default AnswerTableBody;
