import Clipboard from 'quill/modules/clipboard';
import Quill, { type Range } from 'quill';

export class LineBreakClipboard extends Clipboard {
  onPaste (range: Range, { text, html }: { text?: string;
    html?: string; }): void {
    if (typeof text == 'string') {
      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      if (text.endsWith('\n')) {
        text = text.slice(0, text.length - 1);
      }

      super.onPaste(range, { text,
        html });
      this.quill.setSelection(range.index + text.length, Quill.sources.USER);
    } else {
      super.onPaste(range, { text,
        html });
    }
  }
}
