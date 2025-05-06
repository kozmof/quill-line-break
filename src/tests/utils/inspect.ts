import { expect } from 'vitest';
import Quill, { Delta } from 'quill';
import { createLineBreakQuill } from './createLineBreakQuill';
import { normalizeLineBreak } from '../../util/normalizeLineBreak';


class FromHTML {
  private quill: Quill;

  constructor (html: string) {
    this.quill = createLineBreakQuill(html);
  }

  isCompatWith (delta: Delta) {
    expect(delta).toEqual(normalizeLineBreak(this.quill.editor.getDelta()));
    return new FromDelta(delta);
  }

  debug () {
    console.log('Delta:', JSON.stringify(this.quill.editor.getDelta()));
    console.log('DOM:', this.quill.root.innerHTML);
    return this;
  }
}

class FromDelta {
  private quill: Quill;

  constructor (delta: Delta) {
    this.quill = createLineBreakQuill();
    this.quill.setContents(delta);
  }

  isFinallyEq (delta: Delta) {
    expect(normalizeLineBreak(this.quill.editor.getDelta())).toStrictEqual(delta);
    return this;
  }

  toBe (html: string) {
    expect(this.quill.root.innerHTML).toBe(html);
    return new FromHTML(html);
  }

  focus () {
    this.quill.root.focus();
    return this;
  }

  pressEnter (counts: number) {
    for (let i = 0; i < counts; i++) {
      const keyboardEvent = new KeyboardEvent('keydown', {
        code: 'Enter',
        key: 'Enter',
        charCode: 13,
        keyCode: 13
      });
      this.quill.root.dispatchEvent(keyboardEvent);
    }
    return this;
  }

  select (index: number, length: number) {
    this.quill.setSelection(index, length);
    return this;
  }

  paste (clipboardEvent: ClipboardEvent) {
    this.quill.clipboard.onCapturePaste(clipboardEvent);
    return this;
  }

  copy (clipboardEvent: ClipboardEvent) {
    this.quill.clipboard.onCaptureCopy(clipboardEvent, true);
    return this;
  }

  undo (counts: number) {
    for (let i = 0; i < counts; i++) {
      this.quill.history.undo();
    }
    return this;
  }

  redo (counts: number) {
    for (let i = 0; i < counts; i++) {
      this.quill.history.redo();
    }
    return this;
  }

  getSelection () {
    return this.quill.getSelection();
  }

  insert (index: number, text: string) {
    this.quill.insertText(index, text);
    return this;
  }

  debug () {
    console.log('Delta:', JSON.stringify(this.quill.editor.getDelta()));
    console.log('DOM:', this.quill.root.innerHTML);
    return this;
  }

}

export const inspect = (delta: Delta) => {
  return new FromDelta(delta);
};
