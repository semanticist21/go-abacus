import {Paragraph, TextRun} from 'docx';

const spacer = (spacing: number = 200) => {
  return new Paragraph({
    children: [
      new TextRun({
        text: '',
        size: 1,
      }),
    ],
    spacing: {
      after: spacing,
    },
  });
};

export default spacer;
