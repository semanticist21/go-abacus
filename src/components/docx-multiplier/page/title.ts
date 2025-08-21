import {AlignmentType, Paragraph, TextRun} from 'docx';

const pageTitle = (title: string) => {
  return new Paragraph({
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 32,
      }),
    ],
    spacing: {
      after: 200,
    },
    alignment: AlignmentType.CENTER,
  });
};

export default pageTitle;
