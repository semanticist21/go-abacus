import {Paragraph} from 'docx';

const VerticalSpacer = () =>
  new Paragraph({
    spacing: {
      after: 100,
    },
  });

export default VerticalSpacer;
