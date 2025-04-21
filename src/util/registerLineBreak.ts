import Quill from 'quill';
import { LineBreak } from '../blots/lineBreak';
import { LineBreakClipboard } from '../modules/clipboard';
import { LineBreakScroll } from '../blots/scroll';
import { LineBreakCursor } from '../blots/cursor';
import { LineBreakBlock } from '../blots/block';


export const registerLineBreak = () => {
  Quill.register('modules/clipboard', LineBreakClipboard, true);
  Quill.register('blots/scroll', LineBreakScroll, true);
  Quill.register('blots/cursor', LineBreakCursor, true);
  Quill.register('blots/break', LineBreak, true);
  Quill.register('blots/block', LineBreakBlock, true);
};
