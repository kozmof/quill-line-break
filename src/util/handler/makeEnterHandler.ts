import Quill from 'quill';
import { BindingObject } from '../bindings';
import { LineBreak } from '../../blots/lineBreak';
import { LineBreakEnterHandler } from './lineBreakHandler';
import { defaultEnterHandler } from './defaultEnterHandler';

export const makeEnterHandler = (): BindingObject => {
  return {
    key: 'Enter',
    handler: function (range, curContext) {
      const currentLeaf = this.quill.getLeaf(range.index)[0];
      const nextLeaf = this.quill.getLeaf(range.index + 1)[0];

      /**
       * '|' is a cursor
       * 
       * [text] | [null]
       * ----------------------
       * 
       * Hello|
       * 
       * [Enter]
       * 
       * Hello\n
       * |\n\n
       * 
       * [Press A]
       * 
       * Hello\n
       * A|\n
       * 
       */
      if (currentLeaf?.statics.blotName !== LineBreak.blotName && (nextLeaf === null || currentLeaf?.parent !== nextLeaf.parent)) {
        this.quill.insertEmbed(range.index, LineBreak.blotName, true, Quill.sources.USER);
        LineBreakEnterHandler(this.quill, range);
        return;
      }

      /**
       * [LineBreak] | [LineBreak]
       * ----------------------
       * 
       */
      if (currentLeaf?.statics.blotName === LineBreak.blotName && nextLeaf?.statics.blotName === LineBreak.blotName) {
        defaultEnterHandler(this.quill, curContext, range);
        return;
      }

      /**
       * [text] | [text]
       * ----------------------
       * 
       * H|ello
       * 
       * [Enter]
       * 
       * H\n
       * |ello
       * 
       */
      if (currentLeaf?.statics.blotName !== LineBreak.blotName && nextLeaf?.statics.blotName !== LineBreak.blotName) {
        LineBreakEnterHandler(this.quill, range);
        return;
      }

      /**
       * [LineBreak] | [text]
       * ----------------------
       * H\n
       * |ello
       * 
       * [Enter]
       * 
       * H\n
       * \n
       * |ello
       * 
       */
      if (currentLeaf?.statics.blotName === LineBreak.blotName && nextLeaf?.statics.blotName !== LineBreak.blotName) {
        defaultEnterHandler(this.quill, curContext, range);
        return;
      }

      /**
       * [text] | [LineBreak]
       * ----------------------
       * 
       * H\n|
       * ello
       * 
       * [Enter]
       * 
       * H\n
       * |\n
       * ello
       * 
       */
      if (currentLeaf?.statics.blotName !== LineBreak.blotName && nextLeaf?.statics.blotName === LineBreak.blotName) {
        LineBreakEnterHandler(this.quill, range);
        return;
      }
    }
  };
};