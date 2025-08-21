import {AlignmentType, Paragraph, TextRun} from 'docx';

const pageDescRow = (subtitle: string) => {
  return new Paragraph({
    children: [
      new TextRun({
        text: subtitle,
        italics: true,
        size: 24,
      }),
    ],
    spacing: {
      after: 300,
    },
    alignment: AlignmentType.CENTER,
  });
};

export default pageDescRow;
