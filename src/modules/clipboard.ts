import Clipboard, { matchBlot } from 'quill/modules/clipboard';
import Quill, { Delta, type Range } from 'quill';
import { BlockBlot, ScrollBlot } from 'parchment';
import { LineBreak } from '../blots/lineBreak';

type Selector = string | Node['TEXT_NODE'] | Node['ELEMENT_NODE'];
type Matcher = (node: Node, delta: Delta, scroll: ScrollBlot) => Delta;
interface ClipboardOptions {
  matchers: [Selector, Matcher][];
}

const lineBreakMatchBlot = (node: Node, delta: Delta, scroll: ScrollBlot) => {
  if (delta.ops.length === 1 && delta.ops[0].insert === '\n') {
    return new Delta();
  }

  const match = scroll.query(node);
  if (match && 'tagName' in match && match.blotName === LineBreak.blotName) {
    return delta.insert('\n');
  } else if (match && 'prototype' in match && match.prototype instanceof BlockBlot) {
    return delta.insert('\n');
  } else {
    return matchBlot(node, delta, scroll);
  }
};

export class LineBreakClipboard extends Clipboard {
  constructor (quill: Quill, options: Partial<ClipboardOptions>) {
    super(quill, options);
    this.matchers = this.matchers.filter(value => value[1].name !== 'matchBlot');
    this.matchers.push([Node.ELEMENT_NODE, lineBreakMatchBlot]);
  }

  onPaste (range: Range, { text, html }: {
    text?: string;
    html?: string;
  }): void {
    if (typeof text == 'string') {
      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      if (text.endsWith('\n')) {
        text = text.slice(0, text.length - 1);
      }

      super.onPaste(range, {
        text,
        html
      });
      this.quill.setSelection(range.index + text.length, Quill.sources.USER);
    } else {
      super.onPaste(range, {
        text,
        html
      });
    }
  }
}
