import {AlignmentType, Paragraph, TableCell, TableRow, TextRun} from 'docx';

import {COLORS, SIZES} from '../shared/const';

const AnswerTableHeaderCells = (title: string, length: number = 6) => {
  const cells: TableCell[] = [];

  cells.push(
    new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: title,
              size: SIZES.font.solution,
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
      columnSpan: length,
      verticalAlign: 'center',
      shading: {
        fill: COLORS.header,
      },
      margins: {
        top: 100,
        bottom: 100,
      },
      borders: {
        left: {
          size: SIZES.border.single,
          style: 'single',
        },
        top: {
          size: SIZES.border.single,
          style: 'single',
        },
        right: {
          size: SIZES.border.single,
          style: 'single',
        },
      },
    })
  );

  return new TableRow({children: cells});
};

export default AnswerTableHeaderCells;
