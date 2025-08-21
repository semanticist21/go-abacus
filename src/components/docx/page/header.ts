import {AlignmentType, Paragraph, TextRun, Header} from 'docx';
import {SIZES} from '../shared/const';

const PageHeader = (text: string) => {
  return new Header({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            size: SIZES.font.subtitle,
            bold: true,
            text,
          }),
        ],
        alignment: AlignmentType.RIGHT,
      }),
    ],
  });
};

export default PageHeader;
