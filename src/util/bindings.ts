import Quill, { type Range } from 'quill';
import { type Context } from 'quill/modules/keyboard';
import { makeEmbedLineArrowHandler } from './handler/makeEmbedArrowHandler';
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

type Bindings = Record<string, BindingObject>;

export const createLineBreakBindings = (): Bindings => {
  return {
    'embed right': makeEmbedLineArrowHandler('ArrowRight', false),
    'embed right shift': makeEmbedLineArrowHandler('ArrowRight', true),
    'embed left': makeEmbedLineArrowHandler('ArrowLeft', false),
    'embed left shift': makeEmbedLineArrowHandler('ArrowLeft', true),
    enter: makeEnterHandler()
  };
};
