import {AlignmentType, Paragraph, TextRun} from 'docx';
import {SIZES} from '../shared/const';

const pageTitle = (text: string) => {
  return new Paragraph({
    children: [new TextRun({text, bold: true, size: SIZES.font.title})],
    alignment: AlignmentType.CENTER,
  });
};

export default pageTitle;
