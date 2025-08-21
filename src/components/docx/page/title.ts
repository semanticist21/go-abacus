import {AlignmentType, Paragraph, TextRun} from 'docx';
import {SIZES} from '../shared/const';

const pageTitle = (text: string) => {
  return new Paragraph({
    children: [new TextRun({size: SIZES.font.title, bold: true, text})],
    alignment: AlignmentType.CENTER,
  });
};

export default pageTitle;
