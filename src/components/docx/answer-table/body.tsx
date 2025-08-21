import {AlignmentType, Paragraph, TableCell, TableRow, TextRun} from 'docx';
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
              size: isLastRow ? SIZES.border.single : undefined,
              style: 'single',
            },
            top: {
              size: SIZES.border.single,
              style: 'none',
            },
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: rowAnswers[idx].toLocaleString(),
                  font: SIZES.family.solution,
                  size: SIZES.font.solution,
                  characterSpacing: 15,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          margins: {
            bottom: 100,
            top: 100,
          },
          verticalAlign: 'center',
        })
      );
    });

    return new TableRow({
      height: {value: SIZES.columns.height.answer, rule: 'atLeast'},
      children: cells,
    });
  };

  return Array.from({length}).map((_, i) => makeRow(i));
};

export default AnswerTableBody;
