import {AlignmentType, TableRow, WidthType} from 'docx';
import {TextRun} from 'docx';
import {Paragraph} from 'docx';
import {TableCell} from 'docx';
import {SIZES} from '../shared/const';

const SolutionTableFooterCells = (length: number = 6) => {
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
                ? new TextRun({text: '計', size: SIZES.font.numbering})
                : new TextRun({text: '', size: SIZES.font.empty}),
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
        borders: {
          bottom: {
            size: SIZES.border.single,
            style: 'single',
          },
          left: {
            size: isFirst ? SIZES.border.single : undefined,
            style: 'single',
          },
          right: {
            size: isLast ? SIZES.border.single : undefined,
            style: 'single',
          },
        },
      })
    );
  });

  return new TableRow({children: cells});
};

export default SolutionTableFooterCells;
