export interface DocumentLine {
  readonly text: string;
}

export interface TextDocumentLike {
  readonly lineCount: number;
  lineAt(line: number): DocumentLine;
}

export interface SelectionLike {
  readonly start: { readonly line: number };
  readonly end: { readonly line: number };
  readonly isEmpty: boolean;
}

export interface SelectedLineContext {
  readonly startLine: number;
  readonly endLine: number;
  readonly text: string;
}

/**
 * 将选区扩展为完整的起止行，并保留文档中每一行的原始内容。
 */
export function getSelectedLineContext(
  document: TextDocumentLike,
  selection: SelectionLike,
): SelectedLineContext | null {
  if (selection.isEmpty) {
    return null;
  }

  const startLine = Math.max(0, selection.start.line);
  const endLine = Math.min(document.lineCount - 1, selection.end.line);

  if (startLine > endLine || document.lineCount === 0) {
    return null;
  }

  const lines: string[] = [];
  for (let line = startLine; line <= endLine; line += 1) {
    lines.push(document.lineAt(line).text);
  }

  return {
    startLine,
    endLine,
    text: lines.join("\n"),
  };
}
