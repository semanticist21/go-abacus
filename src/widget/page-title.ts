import {AlignmentType, Paragraph, TextRun} from 'docx';

const pageTitle = (text: string) => {
  return new Paragraph({
    children: [new TextRun({text, bold: true, size: 32})],
    alignment: AlignmentType.CENTER,
  });
};

export default pageTitle;
