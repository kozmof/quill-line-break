import { BindingObject } from '../bindings';
import Quill from 'quill';
import { EmbedBlot } from 'parchment';


export function makeLineBreakEmbedArrowHandler (
  key: string,
  shiftKey: boolean | null
): BindingObject {
  const where = key === 'ArrowLeft' ? 'prefix' : 'suffix';
  const pattern = key === 'ArrowLeft' && shiftKey ? /\n/ : /^$/;
  return {
    key,
    shiftKey,
    altKey: null,
    [where]: pattern,
    handler (range) {
      let { index } = range;
      if (key === 'ArrowRight') {
        index += range.length + 1;
      }

      const [leaf] = this.quill.getLeaf(index);
      const [compareLeaf] = this.quill.getLeaf(
        key === 'ArrowRight' ? index + 1 : index - 1
      );

      let offset = leaf?.parent !== compareLeaf?.parent ? 2 : 1;
      if (shiftKey) {
        offset += 1;
      }

      if (!(leaf instanceof EmbedBlot)) return true;
      if (key === 'ArrowLeft') {
        if (shiftKey) {
          this.quill.setSelection(
            range.index - offset,
            range.length + offset,
            Quill.sources.USER
          );
        } else {
          this.quill.setSelection(range.index - offset, Quill.sources.USER);
        }
      } else if (shiftKey) {
        this.quill.setSelection(
          range.index,
          range.length + offset,
          Quill.sources.USER
        );
      } else {
        this.quill.setSelection(
          range.index + range.length + offset,
          Quill.sources.USER
        );
      }
      return false;
    }
  };
}
