import * as vscode from "vscode";

/**
 * 将已经准备好的上下文文本写入 VS Code 剪贴板。
 */
export function writeClipboard(text: string): Thenable<void> {
  return vscode.env.clipboard.writeText(text);
}
