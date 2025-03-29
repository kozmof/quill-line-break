import { EmbedBlot } from 'parchment';

export class LineBreak extends EmbedBlot {
  static blotName = 'line-break';

  static className = 'ql-line-break';

  static tagName = 'br';

  value () {
    return '\n';
  }

  length (): number {
    return 1;
  }
}
