import { WidthType, Document, TableRow, Packer, Table } from 'docx';
import { save } from '@tauri-apps/plugin-dialog';
import { toast } from 'sonner';
import { defaultFileNameRegex, makeRandomFileName, MultiplySolutions, MultiplyOptions } from '../../pages/multiply/type';
import { getCurrentResourceDir, saveFileBlob } from '../../util/fs';
import SolutionTableFooterCells from './solution-table/footer.tsx';
import SolutionTableHeaderCells from './solution-table/header';
import AnswerTableHeaderCells from './answer-table/header.tsx';
import AnswerTableBodyCells from './answer-table/body.tsx';
import SolutionTableBody from './solution-table/body.tsx';
import pageDescRow from './page/desc-row.ts';
import PageHeader from './page/header.ts';
import pageTitle from './page/title.ts';
import spacer from './spacer.ts';

const _make1Solution = (solutions: MultiplySolutions[], options: MultiplyOptions) => {
  const rows: TableRow[] = [];

  rows.push(SolutionTableHeaderCells());
  SolutionTableBody(solutions, options).forEach((row: TableRow) => rows.push(row));
  rows.push(SolutionTableFooterCells());

  return new Table({
    width: {type: WidthType.PERCENTAGE, size: 100},
    rows: rows,
  });
};

const _create1AnswerTable = (title: string, options: MultiplyOptions, solutions: MultiplySolutions[]) => {
  const rows: TableRow[] = [];
  const onlyAnswers = solutions.map((s) => s.answer);

  rows.push(AnswerTableHeaderCells(title));
  AnswerTableBodyCells(
    onlyAnswers,
    options.page_count // Using page_count as a simple divisor for now
  ).forEach((row: TableRow) => rows.push(row));

  return new Table({
    width: {type: WidthType.PERCENTAGE, size: 100},
    rows: rows,
  });
};

export const createPagesThenSave = async (options: MultiplyOptions, solutions: MultiplySolutions[]) => {
  const resDir = await getCurrentResourceDir();

  const savePath = await save({
    defaultPath: resDir + '/' + options.file_name + '.docx',
    filters: [{extensions: ['docx'], name: 'docx'}],
  });

  if (!savePath) return;

  const getPageHeaderTitle = (order: number) => {
    return `${options.title.replaceAll(' ', '_')}-${order.toString().padStart(3, '0')}`;
  };

  // For now, we'll create a simple structure with the basic options
  // This can be expanded later when more detailed requirements are provided
  const solutionsPerPage = Math.ceil(solutions.length / options.page_count);

  // solution table
  const allSolutionTables = Array.from({length: options.page_count}).map((_, idx) => {
    const aPageSolutions = solutions.slice(
      idx * solutionsPerPage,
      idx * solutionsPerPage + solutionsPerPage
    );

    return {
      children: [
        pageTitle(`${options.title}`),
        spacer(100),
        pageDescRow(`${options.subtitle}`),
        spacer(100),
        _make1Solution(aPageSolutions, options),
      ],
      headers: {
        default: PageHeader(getPageHeaderTitle(idx + 1)),
      },
    };
  });

  // answer table
  const answerSectionChildren = {
    children: Array.from({length: options.page_count}, (_, idx) => {
      const result = [
        _create1AnswerTable(
          getPageHeaderTitle(idx + 1),
          options,
          solutions.slice(idx * solutionsPerPage, (idx + 1) * solutionsPerPage)
        ),
      ];

      if (idx !== options.page_count - 1) {
        result.push(spacer(400));
      }

      return result;
    }).flat(),
  };

  const doc = new Document({
    sections: [
      ...allSolutionTables,
      answerSectionChildren,
    ],
  });

  try {
    const blob = await Packer.toBlob(doc);
    await saveFileBlob(blob, savePath);

    toast.success('성공', {
      description: '파일 저장에 성공했습니다.',
    });

    const previousFileName = options.file_name;
    const regex = new RegExp(defaultFileNameRegex);

    const isUserCustomFileName = !regex.test(previousFileName);
    if (isUserCustomFileName) return;

    // Note: We don't have access to useMultiplyOptionStore here like in main
    // This would need to be handled differently if auto-filename reset is needed
  } catch (e) {
    console.error(e);
    toast.error('에러', {
      description: '파일 저장에 실패했습니다.\n 혹시 동일한 이름을 가진 문서가\n 열려있다면 닫아주세요.',
    });
  }
};
