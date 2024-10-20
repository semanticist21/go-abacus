import {PageBreak, Paragraph} from 'docx';

export const breakPage = () =>
  new Paragraph({
    children: [new PageBreak()],
  });
