import { Delta } from 'quill';
import Scroll from 'quill/blots/scroll';
import type Emitter from 'quill/core/emitter';
import { Blot, TextBlot, type Registry } from 'parchment';
import { LineBreak } from './lineBreak';
import Block from 'quill/blots/block';

const isHardBreak = (
  prev: [Blot, number] | undefined,
  current: [Blot, number] | undefined,
  next: [Blot, number] | undefined
) => {
  if (
    prev?.[0].statics.blotName === TextBlot.blotName &&
    current?.[0].statics.blotName === LineBreak.blotName &&
    next?.[0].statics.blotName === LineBreak.blotName
  ) {
    return true;
  } else if (
    prev?.[0].statics.blotName === TextBlot.blotName &&
    current?.[0].statics.blotName === LineBreak.blotName &&
    next?.[0].statics.blotName === TextBlot.blotName
  ) {
    return true;
  } else if (
    prev?.[0].statics.blotName === LineBreak.blotName &&
    current?.[0].statics.blotName === LineBreak.blotName &&
    next?.[0].statics.blotName === TextBlot.blotName
  ) {
    return true;
  } else if (
    prev?.[0].statics.blotName === TextBlot.blotName &&
    current?.[0].statics.blotName === LineBreak.blotName &&
    next?.[0].statics.blotName === undefined
  ) {
    return true;
  }
  return false;
};

export class LineBreakScroll extends Scroll {

  constructor (registry: Registry, domNode: HTMLDivElement, { emitter }: {
    emitter: Emitter;
  }) {
    super(registry, domNode, { emitter });
  }

  insertAt (index: number, value: string, def?: unknown): void {
    if (value === '\n') {
      const next = this.path(index + 1).pop();
      const current = this.path(index).pop();
      const prev = this.path(index - 1).pop();

      if (isHardBreak(prev, current, next)) {
        super.insertAt(index, value, def);
      } else {
        super.insertAt(index, LineBreak.blotName, true);
      }
      return;
    }

    super.insertAt(index, value, def);
  }

  insertContents (index: number, delta: Delta): void {
    const inserts = delta.ops.map(op => op.insert);
    for (const insert of inserts) {
      if (typeof insert === 'string') {
        const breakSplit = insert.split('\n\n').reverse();
        for (let i = 0; i < breakSplit.length; i++) {
          if (breakSplit.length === 1 && breakSplit[0] === '') {
            super.insertAt(index, Block.blotName, true);
            super.insertAt(index, LineBreak.blotName, true);
            return;
          }

          if (i !== 0) {
            super.insertAt(index, Block.blotName, true);
            super.insertAt(index, LineBreak.blotName, true);
          }

          const paragraph = breakSplit[i];
          let textLength = 0;

          const lines = paragraph.split('\n');
          for (let j = 0; j < lines.length; j++) {
            const text = lines[j];
            super.insertContents(index + textLength, new Delta().insert(text));
            if (j !== 0) {
              super.insertAt(index + textLength, LineBreak.blotName, true);
              textLength += 1;
            }
            textLength += text.length;
          }
        }
      } else {
        if (insert !== undefined) {
          super.insertContents(index, new Delta().insert(insert));
        }
      }
    }
  }
}
