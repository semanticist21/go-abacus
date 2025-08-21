import {Header, Paragraph, TextRun, AlignmentType} from 'docx';

const PageHeader = (title: string) => {
  return new Header({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: title,
            size: 20,
            bold: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
    ],
  });
};

export default PageHeader;
