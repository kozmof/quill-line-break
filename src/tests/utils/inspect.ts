import { expect } from 'vitest';
import Quill, { Delta } from 'quill';
import { createLineBreakQuill } from './createLineBreakQuill';


class FromHTML {
  private quill: Quill;

  constructor (html: string) {
    this.quill = createLineBreakQuill(html);
  }

  isCompatWith (delta: Delta) {
    expect(delta).toEqual(this.quill.editor.getDelta());
    return new FromDelta(delta);
  }

  debug () {
    console.log('Delta:', this.quill.editor.getDelta());
    console.log('DOM:', this.quill.root.innerHTML);
  }
}

class FromDelta {
  private quill: Quill;

  constructor (delta: Delta) {
    this.quill = createLineBreakQuill();
    this.quill.setContents(delta);
  }

  toBe (html: string) {
    expect(this.quill.root.innerHTML).toBe(html);
    return new FromHTML(html);
  }

  debug () {
    console.log('Delta:', this.quill.editor.getDelta());
    console.log('DOM:', this.quill.root.innerHTML);
  }

}

export const inspect = (delta: Delta) => {
  return new FromDelta(delta);
};
