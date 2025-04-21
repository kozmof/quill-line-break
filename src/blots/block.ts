import { Delta, Op } from "quill";
import Block from "quill/blots/block";
import { LineBreak } from "./lineBreak";

export class LineBreakBlock extends Block {
  delta(): Delta {
    const newOps: Op[] = []
    const ops = super.delta().ops
    for (const op of ops) {
      if (op.insert && typeof op.insert !== 'string' && LineBreak.blotName in op.insert && op.insert[LineBreak.blotName] === true) {
        const prev = newOps.pop();
        if (prev) {
          const mod = { ...prev }
          mod.insert += '\n';
          newOps.push(mod)
        } else {
          op.insert = '\n'
          newOps.push(op)
        }
      } else {
        const prev = newOps.pop();
        if (prev && typeof prev.insert === 'string' && typeof op.insert === 'string') {
          const mod = { ...prev }
          mod.insert += op.insert
          newOps.push(mod)
        } else {
          newOps.push(op)
        }
      }
    }
    const newDelta = new Delta(newOps)
    return newDelta
  }
}
