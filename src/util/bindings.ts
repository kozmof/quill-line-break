import Quill, { type Range } from 'quill';
import { type Context } from 'quill/modules/keyboard';
import { makeLineBreakEmbedArrowHandler } from './handler/makeEmbedArrowHandler';
import { makeEnterHandler } from './handler/makeEnterHandler';

interface BindingBase
  extends Partial<Omit<Context, 'prefix' | 'suffix' | 'format'>> {
  key: number | string;
  shiftKey?: boolean | null;
  altKey?: boolean | null;
  metaKey?: boolean | null;
  ctrlKey?: boolean | null;
  prefix?: RegExp;
  suffix?: RegExp;
  format?: Record<string, unknown> | string[];
  handler?: (
    this: { quill: Quill },
    range: Range,
    curContext: Context,
    binding: BindingBase,
  ) => void;
}

export interface BindingObject extends Omit<BindingBase, 'key'> {
  key: number | string | string[];
  shortKey?: boolean | null;
}

export type Bindings = Record<string, BindingObject>;

export const createLineBreakBindings = (): Bindings => {
  return {
    'embed right': makeLineBreakEmbedArrowHandler('ArrowRight', false),
    'embed right shift': makeLineBreakEmbedArrowHandler('ArrowRight', true),
    'embed left': makeLineBreakEmbedArrowHandler('ArrowLeft', false),
    'embed left shift': makeLineBreakEmbedArrowHandler('ArrowLeft', true),
    enter: makeEnterHandler()
  };
};
