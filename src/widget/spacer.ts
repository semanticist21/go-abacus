import {Paragraph} from 'docx';

const spacer = (designatedSpacing: number = 100) =>
  new Paragraph({
    spacing: {
      after: designatedSpacing,
    },
  });

export default spacer;
