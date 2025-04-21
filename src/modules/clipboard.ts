import Clipboard, { matchBlot } from 'quill/modules/clipboard';
import Quill, { Delta } from 'quill';
import { BlockBlot, ScrollBlot } from 'parchment';
import { LineBreak } from '../blots/lineBreak';

type Selector = string | Node['TEXT_NODE'] | Node['ELEMENT_NODE'];
type Matcher = (node: Node, delta: Delta, scroll: ScrollBlot) => Delta;
interface ClipboardOptions {
  matchers: [Selector, Matcher][];
}

const isEmptyParagraph = (node: Node) => {
  if (node.nextSibling !== null && node.nodeName === 'P' && node.childNodes.length === 1 && node.childNodes[0].nodeName === 'BR') {
    return true;
  } else {
    return false;
  }
};

const lineBreakMatchBlot = (node: Node, delta: Delta, scroll: ScrollBlot) => {
  if (delta.ops.length === 1 && delta.ops[0].insert === '\n' && !isEmptyParagraph(node)) {
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
}
