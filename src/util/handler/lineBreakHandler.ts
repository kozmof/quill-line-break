import Quill, { type Range } from 'quill';
import { LineBreak } from '../../blots/lineBreak';


export const LineBreakEnterHandler = (quill: Quill, range: Range) => {
  quill.insertEmbed(range.index, LineBreak.blotName, true, Quill.sources.USER);
  quill.setSelection(range.index + 1, Quill.sources.SILENT);
};
