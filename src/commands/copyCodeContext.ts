import * as vscode from "vscode";
import { formatCopyPayload } from "../core/copyPayload";
import { getSelectedLineContext } from "../core/selectionContext";
import { getWorkspaceRelativePath } from "../core/workspacePath";
import { writeClipboard } from "../infra/clipboard";

/**
 * 读取当前编辑器上下文，生成代码上下文并复制到剪贴板。
 */
export async function copyCodeContext(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
  const relativePath = workspaceFolder
    ? getWorkspaceRelativePath(workspaceFolder.uri.fsPath, editor.document.uri.fsPath)
    : null;

  if (!relativePath) {
    await vscode.window.showWarningMessage("复制代码上下文失败：请先打开工作区并保存文件。");
    return;
  }

  const selectedLines = getSelectedLineContext(editor.document, editor.selection);
  if (!selectedLines) {
    return;
  }

  const payload = formatCopyPayload({
    filePath: relativePath,
    startLine: selectedLines.startLine,
    endLine: selectedLines.endLine,
    code: selectedLines.text,
  });

  await writeClipboard(payload);
}
