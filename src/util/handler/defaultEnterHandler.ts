import Quill, { Delta, type Range } from 'quill';
import { type Context } from 'quill/modules/keyboard';
import { Scope } from 'parchment';


export const defaultEnterHandler = (quill: Quill, curContext: Context, range: Range) => {
  const lineFormats = Object.keys(curContext.format).reduce(
    (formats: Record<string, unknown>, format) => {
      if (
        quill.scroll.query(format, Scope.BLOCK) &&
        !Array.isArray(curContext.format[format])
      ) {
        formats[format] = curContext.format[format];
      }
      return formats;
    },
    {}
  );
  const delta = new Delta()
    .retain(range.index)
    .delete(range.length)
    .insert('\n', lineFormats);
  quill.updateContents(delta, Quill.sources.USER);
  quill.setSelection(range.index + 1, Quill.sources.SILENT);
  quill.focus();
};
