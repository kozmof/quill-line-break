import { Bindings, createLineBreakBindings } from './bindings';
import { registerLineBreak } from './registerLineBreak';

type LineBreakOptions = {
  modules: {
    keyboard: {
      bindings: Bindings;
    };
  };
};

/**
 * This utility is the same as the following code.
 * 
 * ```ts
 * Quill.register('modules/clipboard', LineBreakClipboard, true);
 * Quill.register('blots/scroll', LineBreakScroll, true);
 * Quill.register('blots/break', LineBreak, true);
 * 
 * const bindings = {
 *   'embed right': makeLineBreakEmbedArrowHandler('ArrowRight', false),
 *   'embed right shift': makeLineBreakEmbedArrowHandler('ArrowRight', true),
 *   'embed left': makeLineBreakEmbedArrowHandler('ArrowLeft', false),
 *   'embed left shift': makeLineBreakEmbedArrowHandler('ArrowLeft', true),
 *   enter: makeEnterHandler()
 * };
 * 
 * const options: LineBreakOptions = {
 *   modules: {
 *     keyboard: {
 *       bindings: bindings
 *     }
 *   }
 * };
 * 
 * return options;
 * ```
 * @returns 
 */
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
