import { Delta } from 'quill';
import Scroll from 'quill/blots/scroll';
import type Emitter from 'quill/core/emitter';
import { type Registry } from 'parchment';
import { LineBreak } from './lineBreak';
import Block from 'quill/blots/block';


export class LineBreakScroll extends Scroll {

  constructor(registry: Registry, domNode: HTMLDivElement, { emitter }: {
    emitter: Emitter;
  }) {
    super(registry, domNode, { emitter });
  }

  insertAt(index: number, value: string, def?: unknown): void {
    if (value === '\n') {
      const next = this.path(index + 1).pop();
      const current = this.path(index).pop();
      const prev = this.path(index - 1).pop();


      if (
        prev?.[0].statics.blotName === 'text' &&
        current?.[0].statics.blotName === LineBreak.blotName &&
        next?.[0].statics.blotName === LineBreak.blotName
      ) {
        super.insertAt(index, value, def)
      } else if (
        prev?.[0].statics.blotName === 'text' &&
        current?.[0].statics.blotName === LineBreak.blotName &&
        next?.[0].statics.blotName === 'text'
      ) {
        super.insertAt(index, value, def)
      } else if (
        prev?.[0].statics.blotName === LineBreak.blotName &&
        current?.[0].statics.blotName === LineBreak.blotName &&
        next?.[0].statics.blotName === 'text'
      ) {
        super.insertAt(index, value, def)
      } else if (
        prev?.[0].statics.blotName === 'text' &&
        current?.[0].statics.blotName === LineBreak.blotName &&
        next?.[0].statics.blotName === undefined
      ) {
        super.insertAt(index, value, def)
      } else if (
        prev?.[0].statics.blotName === LineBreak.blotName &&
        current?.[0].statics.blotName === LineBreak.blotName &&
        next?.[0].statics.blotName === undefined
      ) {
        super.insertAt(index - 1, LineBreak.blotName, true);
      } else if (
        prev?.[0].statics.blotName === undefined &&
        current?.[0].statics.blotName === undefined &&
        next?.[0].statics.blotName === undefined
      ) {
        super.insertAt(index - 1, LineBreak.blotName, true);
      } else if (
        prev?.[0].statics.blotName === LineBreak.blotName &&
        current?.[0].statics.blotName === 'block' &&
        next?.[0].statics.blotName === undefined
      ) {
        super.insertAt(index, value, def)
      } else if (
        prev?.[0].statics.blotName === 'block' &&
        current?.[0].statics.blotName === 'block' &&
        next?.[0].statics.blotName === undefined
      ) {
        super.insertAt(index, value, def)
      } else if (
        prev?.[0].statics.blotName === LineBreak.blotName &&
        current?.[0].statics.blotName === LineBreak.blotName &&
        next?.[0].statics.blotName === LineBreak.blotName
      ) {
        super.insertAt(index, value, def)
      } else if (
        prev?.[0].statics.blotName === 'break' &&
        current?.[0].statics.blotName === LineBreak.blotName &&
        next?.[0].statics.blotName === LineBreak.blotName
      ) {
        super.insertAt(index, value, def)
      } else {
        super.insertAt(index, LineBreak.blotName, true);
      }
      return
    }

    super.insertAt(index, value, def)
  }

  insertContents(index: number, delta: Delta): void {
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
