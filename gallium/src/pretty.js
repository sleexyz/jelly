// @flow

import { type ASTx, Name, NumLit, IExp, SExp } from "./AST";

function _pretty<X>(indent: number, node: ASTx<X>): ASTx<X> {
  if (node instanceof Name) {
    return node.copy();
  }
  if (node instanceof NumLit) {
    return node.copy();
  }
  if (node instanceof SExp) {
    const spaces = Array(node.children.length + 1).fill(" ");
    spaces[0] = "";
    spaces[node.children.length] = "";
    return new SExp(
      node.children.map(x => _pretty(indent, x)),
      spaces,
      node.payload
    );
  }
  if (node instanceof IExp) {
    const children = node.children.map(x => _pretty(indent + 2, x));
    const newIndent = indent + 2;
    const extraSpaces = Array(node.extraSpaces.length).fill("");
    return new IExp(children, extraSpaces, newIndent, node.payload);
  }
  throw new Error("Non exhaustive match");
}

export function pretty<X>(node: ASTx<X>): ASTx<X> {
  return _pretty(0, node);
}
