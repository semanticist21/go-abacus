import {AlignmentType, Paragraph, TableCell, TableRow, TextRun} from 'docx';
import {COLORS, SIZES} from '../shared/const';

const AnswerTableHeaderCells = (title: string, length: number = 6) => {
  const cells: TableCell[] = [];

  cells.push(
    new TableCell({
      borders: {
        right: {
          size: SIZES.border.single,
          style: 'single',
        },
        left: {
          size: SIZES.border.single,
          style: 'single',
        },
        top: {
          size: SIZES.border.single,
          style: 'single',
        },
      },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              size: SIZES.font.solution,
              text: title,
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
      margins: {
        bottom: 100,
        top: 100,
      },
      shading: {
        fill: COLORS.header,
      },
      verticalAlign: 'center',
      columnSpan: length,
    })
  );

  return new TableRow({children: cells});
};

export default AnswerTableHeaderCells;
