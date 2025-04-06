import { Bindings, createLineBreakBindings } from './bindings';
import { registerLineBreak } from './registerLineBreak';

type LineBreakOptions = {
  modules: {
    keyboard: {
      bindings: Bindings;
    };
  };
};

export const setupLineBreak = (): LineBreakOptions => {
  registerLineBreak();
  const bindings = createLineBreakBindings();
  const options: LineBreakOptions = {
    modules: {
      keyboard: {
        bindings: bindings
      }
    }
  };
  return options;
};
