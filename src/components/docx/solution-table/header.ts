import {AlignmentType, Paragraph, TableCell, WidthType, TableRow, TextRun} from 'docx';
import {COLORS, SIZES} from '../shared/const';

const SolutionTableHeaderCells = (length: number = 6) => {
  const cells: TableCell[] = [];

  Array.from({length}).forEach((_, j) => {
    const isFirst = j === 0;
    const isLast = j === length - 1;

    cells.push(
      new TableCell({
        children: [
          new Paragraph({
            children: [
              isFirst
                ? new TextRun({
                    size: SIZES.font.numbering,
                    text: 'No.',
                    bold: true,
                  })
                : new TextRun({size: SIZES.font.numbering, text: j.toString()}),
            ],
            alignment: isFirst ? AlignmentType.LEFT : AlignmentType.CENTER,
          }),
        ],
        borders: {
          left: {
            size: isFirst ? SIZES.border.single : undefined,
            style: 'single',
          },
          right: {
            size: isLast ? SIZES.border.single : undefined,
            style: 'single',
          },
          top: {
            size: SIZES.border.single,
            style: 'single',
          },
        },
        width: isFirst
          ? {size: SIZES.columns.width.first, type: WidthType.PERCENTAGE}
          : {
              size: SIZES.columns.width.childColumn(length),
              type: WidthType.PERCENTAGE,
            },
        shading: {
          fill: COLORS.header,
        },
      })
    );
  });

  return new TableRow({children: cells});
};

export default SolutionTableHeaderCells;
