import * as vscode from "vscode";
import { copyCodeContext } from "./commands/copyCodeContext";

/**
 * 注册复制代码上下文命令，并在扩展停用时释放命令订阅。
 */
export function activate(context: vscode.ExtensionContext): void {
  const command = vscode.commands.registerCommand(
    "rightCopyCodeLine.copyContext",
    copyCodeContext,
  );

  context.subscriptions.push(command);
}

/**
 * 当前扩展没有需要主动清理的常驻资源。
 */
export function deactivate(): void {}
