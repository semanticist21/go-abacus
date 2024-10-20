import {AlignmentType, Header, Paragraph, TextRun} from 'docx';

const PageHeader = (text: string) => {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text,
            bold: true,
            color: '000000',
            size: 20,
          }),
        ],
      }),
    ],
  });
};

export default PageHeader;
