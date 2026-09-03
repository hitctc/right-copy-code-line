export interface CopyPayloadInput {
  readonly filePath: string;
  readonly startLine: number;
  readonly endLine: number;
  readonly code: string;
}

/**
 * 生成剪贴板文本：路径、1-based 行范围和代码片段各占一段，末尾保留换行。
 */
export function formatCopyPayload(input: CopyPayloadInput): string {
  const startLine = input.startLine + 1;
  const endLine = input.endLine + 1;

  return `${input.filePath}\n第 ${startLine}-${endLine} 行\n${input.code}\n`;
}
