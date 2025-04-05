import Cursor from 'quill/blots/cursor';
import { EmbedContextRange } from 'quill/blots/embed';
import { LineBreak } from './lineBreak';

export class LineBreakCursor extends Cursor {
  restore (): EmbedContextRange | null {
    const index = this.selection.lastRange?.index;
    if (index) {
      const current = this.scroll.path(index).pop();
      if (current) {
        const blot  = current[0];
        if (blot.statics.blotName === LineBreak.blotName) {
          const next = this.scroll.path(index + 1).pop();
          if (!next) {
            blot.remove();
          }
        }
      }
    }

    return super.restore();
  }
}
