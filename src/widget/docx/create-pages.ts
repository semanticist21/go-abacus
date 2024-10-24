import {Document, Packer, Table, TableRow, WidthType} from 'docx';
import toast from 'react-hot-toast';

import {Options, Solutions} from '../../store/type';
import {saveFileBlob} from '../../util/fs';
import pageDescRow from './page/desc-row';
import PageHeader from './page/header';
import pageTitle from './page/title';
import SolutionTableBody from './solution-table/body';
import SolutionTableFooterCells from './solution-table/footer';
import SolutionTableHeaderCells from './solution-table/header';
import spacer from './spacer';

const _make1Solution = (solutions: Solutions[]) => {
  const rows: TableRow[] = [];

  rows.push(SolutionTableHeaderCells());
  SolutionTableBody(solutions).forEach((row) => rows.push(row));
  rows.push(SolutionTableFooterCells());

  return new Table({
    rows: rows,
    width: {size: 100, type: WidthType.PERCENTAGE},
  });
};

const _createAnswer = () => {};

export const createPages = async (options: Options, solutions: Solutions[]) => {
  const sectionChildren = Array.from({length: options.page_count}).map(
    (_, idx) => {
      const aPageSolutions = solutions.slice(
        idx * options.solutions_per_page,
        idx * options.solutions_per_page + options.solutions_per_page
      );

      const tableUnit = options.solutions_per_page / 3;

      return {
        headers: {
          default: PageHeader(
            `${options.title.replaceAll(' ', '_')}-${(idx + 1).toString().padStart(6, '0')}`
          ),
        },
        children: [
          pageTitle(`${options.title}`),
          spacer(100),
          pageDescRow(`${options.subtitle}`),

          spacer(100),

          _make1Solution(aPageSolutions.slice(0, tableUnit)),
          spacer(0),
          _make1Solution(aPageSolutions.slice(tableUnit, 2 * tableUnit)),
          spacer(0),
          _make1Solution(aPageSolutions.slice(2 * tableUnit, 3 * tableUnit)),
        ],
      };
    }
  );

  const file = new Document({
    sections: sectionChildren,
  });

  try {
    const blob = await Packer.toBlob(file);
    await saveFileBlob(blob, options.file_name + '.docx');

    toast.success('파일 저장에 성공했습니다.');
  } catch (e) {
    console.error(e);
    toast.error(
      '파일 저장에 실패했습니다.\n 혹시 동일한 이름을 가진 문서가\n 열려있다면 닫아주세요.'
    );
  }
};
