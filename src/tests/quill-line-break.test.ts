import { describe, expect, test } from 'vitest';
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
      .isCompatWith(
        new Delta()
          .insert('Hello\n\n\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>');
  });

  test('four `\\n`s separate paragraphs (2)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\n\nQuill\n\n')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>')
      .isCompatWith(
        new Delta()
          .insert('Hello\n\n\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>');
  });

  test('five `\\n`s separate paragraphs (1)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\n\n\nQuill')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break">Quill</p>')
      .isCompatWith(
        new Delta()
          .insert('Hello\n\n\n\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break">Quill<br class="ql-line-break"></p>');
  });

  test('five `\\n`s separate paragraphs (2)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\n\n\nQuill\n\n')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break">Quill<br class="ql-line-break"></p>')
      .isCompatWith(
        new Delta()
          .insert('Hello\n\n\n\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break">Quill<br class="ql-line-break"></p>');
  });

  test('six `\\n`s separate paragraphs (1)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\n\n\n\nQuill')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill</p>')
      .isCompatWith(
        new Delta()
          .insert('Hello\n\n\n\n\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>');
  });

  test('six `\\n`s separate paragraphs (2)', () => {
    inspect(
      new Delta()
        .insert('Hello\n\n\n\n\n\nQuill\n\n')
    )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>')
      .isCompatWith(
        new Delta()
          .insert('Hello\n\n\n\n\n\nQuill\n\n')
      )
      .toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill<br class="ql-line-break"></p>');
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
        .isCompatWith(
          new Delta().insert('\n\nHello Quill\n\n')
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
        .isCompatWith(
          new Delta()
            .insert('\n\n\nHello Quill\n\n')
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
            .insert('\n\n\n\nHello Quill\n\n')
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
        .isCompatWith(
          new Delta().insert('Hello\n\n\n\nQuill\n\n')
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
          new Delta().insert('Hello Quill\n\n\n\n')
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
        .toBe('<p>Hello Quill<br class="ql-line-break"></p><p><br class="ql-line-break"><br class="ql-line-break"></p>')
        // remove the last '\n'
        .isCompatWith(
          new Delta().insert('Hello Quill\n\n\n\n')
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
        .toBe('<p>Hello Quill<br class="ql-line-break"></p><p><br class="ql-line-break"><br class="ql-line-break"><br class="ql-line-break"></p>')
        .isCompatWith(
          new Delta().insert('Hello Quill\n\n\n\n\n\n')
        );
    });
  });
});

describe('paste text', () => {
  test('paste 1', async () => {
    const clipboardEvent = {
      clipboardData: {
        getData: (type: string) =>
          type === 'text/html' ? '' : 'line1\nline2'
      },
      preventDefault: () => {
        return;
      }
    } as ClipboardEvent;
    inspect(new Delta())
      .focus()
      .paste(clipboardEvent)
      .toBe('<p>line1<br class="ql-line-break">line2</p>')
      .isCompatWith(
        new Delta().insert('line1\nline2\n\n')
      );
  });

  test('paste 2', async () => {
    const clipboardEvent = {
      clipboardData: {
        getData: (type: string) =>
          type === 'text/html' ? '' : 'line1\n\nline2'
      },
      preventDefault: () => {
        return;
      }
    } as ClipboardEvent;
    inspect(new Delta())
      .focus()
      .paste(clipboardEvent)
      .toBe('<p>line1<br class="ql-line-break"></p><p>line2</p>')
      .isCompatWith(
        new Delta().insert('line1\n\nline2\n\n')
      );
  });

  test('paste 3', async () => {
    const clipboardEvent = {
      clipboardData: {
        getData: (type: string) =>
          type === 'text/html' ? '' : 'line1\n\n\nline2'
      },
      preventDefault: () => {
        return;
      }
    } as ClipboardEvent;
    inspect(new Delta())
      .focus()
      .paste(clipboardEvent)
      .toBe('<p>line1<br class="ql-line-break"></p><p><br class="ql-line-break">line2</p>')
      .isCompatWith(
        new Delta().insert('line1\n\n\nline2\n\n')
      );
  });

  test('paste 4', async () => {
    const clipboardEvent = {
      clipboardData: {
        getData: (type: string) =>
          type === 'text/html' ? '' : 'line1\n\n\n\nline2'
      },
      preventDefault: () => {
        return;
      }
    } as ClipboardEvent;
    inspect(new Delta())
      .focus()
      .paste(clipboardEvent)
      .toBe('<p>line1<br class="ql-line-break"></p><p><br class="ql-line-break"><br class="ql-line-break">line2</p>')
      .isCompatWith(
        new Delta().insert('line1\n\n\n\nline2\n\n')
      );
  });
});

describe('paste html', () => {
  test('paste 1', async () => {
    const clipboardEvent = {
      clipboardData: {
        getData: (type: string) =>
          type === 'text/html' ? 'line1<br>line2' : ''
      },
      preventDefault: () => {
        return;
      }
    } as ClipboardEvent;
    inspect(new Delta())
      .focus()
      .paste(clipboardEvent)
      .toBe('<p>line1<br class="ql-line-break">line2</p>')
      .isCompatWith(
        new Delta().insert('line1\nline2\n\n')
      );
  });

  test('paste 2', async () => {
    const clipboardEvent = {
      clipboardData: {
        getData: (type: string) =>
          type === 'text/html' ? 'line1<br/><br>line2' : ''
      },
      preventDefault: () => {
        return;
      }
    } as ClipboardEvent;
    inspect(new Delta())
      .focus()
      .paste(clipboardEvent)
      .toBe('<p>line1<br class="ql-line-break"></p><p>line2</p>')
      .isCompatWith(
        new Delta().insert('line1\n\nline2\n\n')
      );
  });

  test('paste 3', async () => {
    const clipboardEvent = {
      clipboardData: {
        getData: (type: string) =>
          type === 'text/html' ? 'line1<br><br/><br>line2' : ''
      },
      preventDefault: () => {
        return;
      }
    } as ClipboardEvent;
    inspect(new Delta())
      .focus()
      .paste(clipboardEvent)
      .toBe('<p>line1<br class="ql-line-break"></p><p><br class="ql-line-break">line2</p>')
      .isCompatWith(
        new Delta().insert('line1\n\n\nline2\n\n')
      );
  });

  test('paste 4', async () => {
    const clipboardEvent = {
      clipboardData: {
        getData: (type: string) =>
          type === 'text/html' ? 'line1<br/><br><br/><br/>line2' : ''
      },
      preventDefault: () => {
        return;
      }
    } as ClipboardEvent;
    inspect(new Delta())
      .focus()
      .paste(clipboardEvent)
      .toBe('<p>line1<br class="ql-line-break"></p><p><br class="ql-line-break"><br class="ql-line-break">line2</p>')
      .isCompatWith(
        new Delta().insert('line1\n\n\n\nline2\n\n')
      );
  });
});

describe('copy', () => {
  const setup = () => {
    const clipboardData: Record<string, string> = {};
    const clipboardEvent = {
      clipboardData: {
        setData: (type, data) => {
          clipboardData[type] = data;
        }
      },
      preventDefault: () => {
        return;
      }
    } as ClipboardEvent;
    return {
      clipboardData,
      clipboardEvent
    };
  };

  test('copy 1', () => {
    const { clipboardData, clipboardEvent } = setup();
    inspect(
      new Delta()
        .insert('Hello\nQuill')
    )
      .select(0, 11)
      .copy(clipboardEvent);

    expect(clipboardData['text/html']).toBe('Hello<br class="ql-line-break">Quill');
    expect(clipboardData['text/plain']).toBe('Hello\nQuill');
  });

  test('copy 2', () => {
    const { clipboardData, clipboardEvent } = setup();
    inspect(
      new Delta()
        .insert('Hello\n\nQuill')
    )
      .select(0, 12)
      .copy(clipboardEvent);

    expect(clipboardData['text/html']).toBe('<p>Hello<br class="ql-line-break"></p><p>Quill</p>');
    expect(clipboardData['text/plain']).toBe('Hello\n\nQuill');
  });

  test('copy 3', () => {
    const { clipboardData, clipboardEvent } = setup();
    inspect(
      new Delta()
        .insert('Hello\n\n\nQuill')
    )
      .select(0, 13)
      .copy(clipboardEvent);

    expect(clipboardData['text/html']).toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break">Quill</p>');
    expect(clipboardData['text/plain']).toBe('Hello\n\n\nQuill');
  });

  test('copy 4', () => {
    const { clipboardData, clipboardEvent } = setup();
    inspect(
      new Delta()
        .insert('Hello\n\n\n\nQuill')
    )
      .select(0, 14)
      .copy(clipboardEvent);

    expect(clipboardData['text/html']).toBe('<p>Hello<br class="ql-line-break"></p><p><br class="ql-line-break"></p><p>Quill</p>');
    expect(clipboardData['text/plain']).toBe('Hello\n\n\n\nQuill');
  });
});

describe('undo/redo', () => {
  test('selection', () => {
    const selection = inspect(new Delta())
      .insert(0, 'aaa')
      .select(3, 0)
      .pressEnter(2)
      .insert(5, 'bbb')
      .select(8, 0)
      .pressEnter(1)
      .insert(9, 'ccc')
      .undo(3)
      .redo(1)
      .undo(2)
      .redo(3)
      .undo(1)
      .redo(2)
      .getSelection();
    
    expect(selection)
      .toEqual({ index: 13,
        length: 0 });
  });

  test('DOM', () => {
    inspect(new Delta())
      .insert(0, 'aaa')
      .select(3, 0)
      .pressEnter(2)
      .insert(5, 'bbb')
      .select(8, 0)
      .pressEnter(1)
      .insert(9, 'ccc')
      .undo(1)
      .redo(1)
      .undo(2)
      .redo(2)
      .undo(3)
      .redo(3)
      .undo(4)
      .redo(4)
      .undo(5)
      .redo(5)
      .undo(6)
      .redo(6)
      .toBe('<p>aaa<br class="ql-line-break"></p><p>bbb<br class="ql-line-break">ccc<br class="ql-line-break"></p>');
  });
});
