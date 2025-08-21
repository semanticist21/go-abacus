import {AlignmentType, Paragraph, TableCell, WidthType, TableRow, TextRun} from 'docx';
import {SIZES} from '../shared/const';

const SolutionTableFooterCells = (length: number = 6) => {
  const cells: TableCell[] = [];

  Array.from({length}).forEach((_, j) => {
    const isFirst = j === 0;
    const isLast = j === length - 1;

    cells.push(
      new TableCell({
        borders: {
          left: {
            size: isFirst ? SIZES.border.single : undefined,
            style: 'single',
          },
          right: {
            size: isLast ? SIZES.border.single : undefined,
            style: 'single',
          },
          bottom: {
            size: SIZES.border.single,
            style: 'single',
          },
        },
        children: [
          new Paragraph({
            children: [
              isFirst
                ? new TextRun({size: SIZES.font.numbering, text: '計'})
                : new TextRun({size: SIZES.font.empty, text: ''}),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        width: isFirst
          ? {size: SIZES.columns.width.first, type: WidthType.PERCENTAGE}
          : {
              size: SIZES.columns.width.childColumn(length),
              type: WidthType.PERCENTAGE,
            },
      })
    );
  });

  return new TableRow({children: cells});
};

export default SolutionTableFooterCells;
