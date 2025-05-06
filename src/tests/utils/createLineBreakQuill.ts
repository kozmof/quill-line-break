import Quill from 'quill';
import { registerLineBreak } from '../../util/registerLineBreak';
import { createLineBreakBindings } from '../../util/bindings';

registerLineBreak();
const bindings = createLineBreakBindings();

export const createLineBreakQuill = (defaultHTML?: string): Quill => {
  const container = document.createElement('div');
  if (defaultHTML) {
    container.innerHTML = defaultHTML;
  }
  document.body.appendChild(container);

  const quill = new Quill(container, {
    modules: {
      keyboard: {
        bindings: bindings
      },
      history: {
        delay: 0
      }
    }
  });

  return quill;
};
