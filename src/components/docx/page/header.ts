import {AlignmentType, Header, Paragraph, TextRun} from 'docx';
import {SIZES} from '../shared/const';

const PageHeader = (text: string) => {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text,
            bold: true,
            size: SIZES.font.subtitle,
          }),
        ],
      }),
    ],
  });
};

export default PageHeader;
