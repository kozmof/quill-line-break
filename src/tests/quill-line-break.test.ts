import { describe, test } from 'vitest';
import { Delta } from 'quill';
import { inspect } from './utils/inspect';

describe('Check Delta to HTML, HTML to Delta', () => {
  test('one `\\n` is a line break (1)', () => {
    inspect(
      new Delta()
        .insert('Hello\nQuill')
    )
      .toBe('<p>Hello<br class="ql-line-break">Quill</p>')
      .isCompatWith(
        new Delta()
          .insert('Hello\nQuill\n\n')
      );
  });

  test('one `\\n` is a line break (2)', () => {
    inspect(
      new Delta()
        .insert('Hello\nQuill\n\n')
    )
      .toBe('<p>Hello<br class="ql-line-break">Quill<br class="ql-line-break"></p>')
      .isCompatWith(
        new Delta()
          .insert('Hello\nQuill\n\n')
      );
  });

  test('two `\\n`s separate paragraphs (1)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\nQuill')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p>Quill</p>')
      .isCompatWith(
        new Delta()
          .insert('Hello\n\nQuill\n\n')
      );
  });

  test('two `\\n`s separate paragraphs (2)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\nQuill\n\n')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>')
      .isCompatWith(
        new Delta()
          .insert('Hello\n\nQuill\n\n')
      );
  });

  test('three `\\n`s separate paragraphs (1)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\nQuill')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break">Quill</p>')
      .isCompatWith(
        new Delta()
          .insert('Hello\n\n\nQuill\n\n')
      );
  });

  test('three `\\n`s separate paragraphs (2)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\nQuill\n\n')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break">Quill<br class="ql-line-break"></p>')
      .isCompatWith(
        new Delta()
          .insert('Hello\n\n\nQuill\n\n')
      );
  });

  test('four `\\n`s separate paragraphs (1)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\n\nQuill')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill</p>')
      // An empty paragraph will be removed 
      .isCompatWith(
        new Delta()
          .insert('Hello\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>');
  });

  test('four `\\n`s separate paragraphs (2)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\n\nQuill\n\n')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>')
      // An empty paragraph will be removed 
      .isCompatWith(
        new Delta()
          .insert('Hello\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>');
  });

  test('five `\\n`s separate paragraphs (1)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\n\n\nQuill')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break">Quill</p>')
      // An empty paragraph will be removed 
      .isCompatWith(
        new Delta()
          .insert('Hello\n\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break">Quill<br class="ql-line-break"></p>');
  });

  test('five `\\n`s separate paragraphs (2)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\n\n\nQuill\n\n')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break">Quill<br class="ql-line-break"></p>')
      // An empty paragraph will be removed 
      .isCompatWith(
        new Delta()
          .insert('Hello\n\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break">Quill<br class="ql-line-break"></p>');
  });

  test('six `\\n`s separate paragraphs (1)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\n\n\n\nQuill')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill</p>')
      // An empty paragraph will be removed 
      .isCompatWith(
        new Delta()
          .insert('Hello\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>');
  });

  test('six `\\n`s separate paragraphs (2)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\n\n\n\nQuill\n\n')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>')
      // An empty paragraph will be removed 
      .isCompatWith(
        new Delta()
          .insert('Hello\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>');
  });
});
