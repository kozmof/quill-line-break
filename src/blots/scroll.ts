import { Delta } from 'quill';
import Scroll from 'quill/blots/scroll';
import type Emitter from 'quill/core/emitter';
import { type Registry } from 'parchment';
import { LineBreak } from './lineBreak';
import Block from 'quill/blots/block';


export class LineBreakScroll extends Scroll {
  prevValue: string;

  constructor (registry: Registry, domNode: HTMLDivElement, { emitter }: {
    emitter: Emitter;
  }) {
    super(registry, domNode, { emitter });
    this.prevValue = '';
  }

  insertAt (index: number, value: string, def?: unknown): void {
    const lineBreakSplit = value.split('\n');
    let offset = index;
    let isParagraph = false;
    let isNextBlotLineBreak = false;

    const next = this.path(index + 1).pop();
    if (next) {
      const blot = next[0];
      isNextBlotLineBreak = blot.statics.blotName === LineBreak.blotName && value === '\n' && this.prevValue === '\n';
    }

    // the value has '\n' but it is not equal to '\n'.
    if (value !== '\n' && lineBreakSplit.length > 1) {
      lineBreakSplit.forEach((splitValue, index) => {
        if (splitValue !== '') {
          super.insertAt(offset, splitValue, def);
          offset += splitValue.length;
          super.insertAt(offset, LineBreak.blotName, true);
          offset += 1;
        } else {
          // Paragraph
          if (index !== lineBreakSplit.length - 1) {
            super.insertAt(offset, '\n', def);
            offset += 1;
            isParagraph = true;
          }
        }
      });
    } else {
      // Line Break
      if (this.prevValue !== LineBreak.blotName && this.prevValue !== '\n' && (value === '\n' || value === LineBreak.blotName)) {
        super.insertAt(offset, LineBreak.blotName, true);
      } else {
        if (value === '\n') {
          if (!isNextBlotLineBreak) {
            isParagraph = true;
            super.insertAt(index, value, def);
          } else {
            super.insertAt(index, LineBreak.blotName, true);
          }
        } else {
          super.insertAt(index, value, def);
        }
      }
    }
    if (isParagraph && !isNextBlotLineBreak) {
      this.prevValue = '';
    } else {
      this.prevValue = value;
    }
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
