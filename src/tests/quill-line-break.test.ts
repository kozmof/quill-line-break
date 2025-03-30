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

describe('Key events', () => {
  describe('Press an enter key', () => {
    test('start 1', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(0, 1)
        .pressEnter(1)
        .isFinallyEq(
          new Delta()
            .insert('\nHello Quill\n')
        )
        .toBe('<p><br class="ql-line-break">Hello Quill</p>')
        .isCompatWith(
          new Delta()
            .insert('\nHello Quill\n\n')
        );
    });

    test('start 2', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(0, 1)
        .pressEnter(2)
        .isFinallyEq(
          new Delta()
            .insert('\n\nHello Quill\n')
        )
        .toBe('<p><br class="ql-line-break"></p><p>Hello Quill</p>')
        // An empty paragraph will be removed 
        .isCompatWith(
          new Delta().insert('Hello Quill\n\n')
        );
    });

    test('start 3', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(0, 1)
        .pressEnter(3)
        .isFinallyEq(
          new Delta()
            .insert('\n\n\nHello Quill\n')
        )
        .toBe('<p><br class="ql-line-break"></p><p><br class="ql-line-break">Hello Quill</p>')
        // An empty paragraph will be removed 
        .isCompatWith(
          new Delta()
            .insert('\nHello Quill\n\n')
        );
    });

    test('start 4', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(0, 1)
        .pressEnter(4)
        .isFinallyEq(
          new Delta()
            .insert('\n\n\n\nHello Quill\n')
        )
        .toBe('<p><br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Hello Quill</p>')
        .isCompatWith(
          new Delta()
            .insert('Hello Quill\n\n')
        );
    });

    test('mid 1', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(5, 1)
        .pressEnter(1)
        .isFinallyEq(
          new Delta().insert('Hello\n Quill\n')
        )
        .toBe('<p>Hello<br class="ql-line-break"> Quill</p>')
        .isCompatWith(
          new Delta().insert('Hello\n Quill\n\n')
        );
    });

    test('mid 2', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(5, 1)
        .pressEnter(2)
        .isFinallyEq(
          new Delta().insert('Hello\n\n Quill\n')
        )
        .toBe('<p>Hello<br class="ql-line-break"></p><p> Quill</p>')
        .isCompatWith(
          new Delta().insert('Hello\n\nQuill\n\n')
        );
    });

    test('mid 3', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(5, 1)
        .pressEnter(3)
        .isFinallyEq(
          new Delta().insert('Hello\n\n\n Quill\n')
        )
        .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"> Quill</p>')
        .isCompatWith(
          new Delta().insert('Hello\n\n\n Quill\n\n')
        );
    });

    test('mid 4', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(5, 1)
        .pressEnter(4)
        .isFinallyEq(
          new Delta().insert('Hello\n\n\n\n Quill\n')
        )
        .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p> Quill</p>')
        // An empty paragraph will be removed 
        .isCompatWith(
          new Delta().insert('Hello\n\nQuill\n\n')
        );
    });

    test('end 1', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(11, 1)
        .pressEnter(1)
        .isFinallyEq(
          new Delta().insert('Hello Quill\n\n\n')
        )
        .toBe('<p>Hello Quill<br class="ql-line-break"><br class="ql-line-break"></p>')
        .isCompatWith(
          new Delta().insert('Hello Quill\n\n')
        );
    });

    test('end 2', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(11, 1)
        .pressEnter(2)
        .isFinallyEq(
          new Delta().insert('Hello Quill\n\n\n\n')
        )
        .toBe('<p>Hello Quill<br class="ql-line-break"></p><p><br class="ql-line-break"></p>')
        .isCompatWith(
          new Delta().insert('Hello Quill\n\n')
        );
    });

    test('end 3', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(11, 1)
        .pressEnter(3)
        .isFinallyEq(
          new Delta().insert('Hello Quill\n\n\n\n\n')
        )
        .toBe('<p>Hello Quill<br class="ql-line-break"></p><p><br></p><p><br class="ql-line-break"></p>')
        .isCompatWith(
          new Delta().insert('Hello Quill\n\n')
        );
    });

    test('end 4', () => {
      inspect(new Delta().insert('Hello Quill'))
        .focus()
        .select(11, 1)
        .pressEnter(4)
        .isFinallyEq(
          new Delta().insert('Hello Quill\n\n\n\n\n\n')
        )
        .toBe('<p>Hello Quill<br class="ql-line-break"></p><p><br></p><p><br></p><p><br class="ql-line-break"></p>')
        .isCompatWith(
          new Delta().insert('Hello Quill\n\n')
        );
    });
  });
});
