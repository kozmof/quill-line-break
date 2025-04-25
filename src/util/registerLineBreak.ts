import Quill from 'quill';
import { LineBreak } from '../blots/lineBreak';
import { LineBreakClipboard } from '../modules/clipboard';
import { LineBreakScroll } from '../blots/scroll';


export const registerLineBreak = () => {
  Quill.register('modules/clipboard', LineBreakClipboard, true);
  Quill.register('blots/scroll', LineBreakScroll, true);
  Quill.register('blots/break', LineBreak, true);
};
