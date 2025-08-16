import {save} from '@tauri-apps/plugin-dialog';
import {Document, Packer, Table, TableRow, WidthType} from 'docx';
import toast from 'react-hot-toast';

import {useOptionStore} from '../../pages/main/store';
import {defaultFileNameRegex, makeRandomFileName, Options, Solutions} from '../../pages/main/type';
import {getCurrentResourceDir, saveFileBlob} from '../../util/fs';
import AnswerTableBodyCells from './answer-table/body';
import AnswerTableHeaderCells from './answer-table/header';
import pageDescRow from './page/desc-row';
import PageHeader from './page/header';
import pageTitle from './page/title';
import SolutionTableBody from './solution-table/body';
import SolutionTableFooterCells from './solution-table/footer';
import SolutionTableHeaderCells from './solution-table/header';
import spacer from './spacer';

const _make1Solution = (solutions: Solutions[], options: Options) => {
  const rows: TableRow[] = [];

  rows.push(SolutionTableHeaderCells());
  SolutionTableBody(solutions, options).forEach((row) => rows.push(row));
  rows.push(SolutionTableFooterCells());

  return new Table({
    rows: rows,
    width: {size: 100, type: WidthType.PERCENTAGE},
  });
};

const _create1AnswerTable = (title: string, options: Options, solutions: Solutions[]) => {
  const rows: TableRow[] = [];
  const onlyAnswers = solutions.map((s) => s.answer);

  rows.push(AnswerTableHeaderCells(title));
  AnswerTableBodyCells(
    onlyAnswers,
    options.solutions_per_page / options.solution_count_per_table
  ).forEach((row) => rows.push(row));

  return new Table({
    rows: rows,
    width: {size: 100, type: WidthType.PERCENTAGE},
  });
};

export const createPagesThenSave = async (options: Options, solutions: Solutions[]) => {
  const resDir = await getCurrentResourceDir();

  const savePath = await save({
    defaultPath: resDir + '/' + options.file_name + '.docx',
    filters: [{name: 'docx', extensions: ['docx']}],
  });

  if (!savePath) return;

  const getPageHeaderTitle = (order: number) => {
    return `${options.title.replaceAll(' ', '_')}-${order.toString().padStart(3, '0')}`;
  };

  // solution table
  const allSolutionTables = Array.from({length: options.page_count}).map((_, idx) => {
    const aPageSolutions = solutions.slice(
      idx * options.solutions_per_page,
      idx * options.solutions_per_page + options.solutions_per_page
    );

    const tableUnit = options.solutions_per_page / options.solution_table_per_page;

    return {
      headers: {
        default: PageHeader(getPageHeaderTitle(idx + 1)),
      },
      children: [
        pageTitle(`${options.title}`),
        spacer(100),
        pageDescRow(`${options.subtitle}`),

        spacer(100),

        _make1Solution(aPageSolutions.slice(0, tableUnit), options),
        spacer(0),
        _make1Solution(aPageSolutions.slice(tableUnit, 2 * tableUnit), options),
        spacer(0),
        _make1Solution(aPageSolutions.slice(2 * tableUnit, 3 * tableUnit), options),
      ],
    };
  });

  // answer table
  const answerSectionChildren = {
    headers: {
      default: PageHeader('정답'),
    },
    children: Array.from({length: options.page_count}, (_, idx) => {
      const result = [
        _create1AnswerTable(
          getPageHeaderTitle(idx + 1),
          options,
          solutions.slice(idx * options.solutions_per_page, (idx + 1) * options.solutions_per_page)
        ),
      ];

      if (idx !== options.page_count - 1) {
        result.push(spacer(0));
      }

      return result;
    }).flat(1),
  };

  const file = new Document({
    sections: [...allSolutionTables, answerSectionChildren],
  });

  try {
    const blob = await Packer.toBlob(file);
    await saveFileBlob(blob, savePath);

    toast.success('파일 저장에 성공했습니다.');

    const previousFileName = options.file_name;
    const regex = new RegExp(defaultFileNameRegex);

    const isUserCustomFileName = !regex.test(previousFileName);
    if (isUserCustomFileName) return;

    useOptionStore.setState((prev) => {
      return {
        ...prev,
        options: {
          ...prev.options,
          file_name: makeRandomFileName(),
        },
      };
    });
  } catch (e) {
    console.error(e);
    toast.error(
      '파일 저장에 실패했습니다.\n 혹시 동일한 이름을 가진 문서가\n 열려있다면 닫아주세요.'
    );
  }
};
