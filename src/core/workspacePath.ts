import * as path from "node:path";

/**
 * 把文件绝对路径转换为指定工作区根目录下的相对路径，并统一为斜杠。
 */
export function getWorkspaceRelativePath(
  workspaceRoot: string,
  filePath: string,
): string | null {
  const relativePath = path.relative(workspaceRoot, filePath);

  if (!relativePath || relativePath.startsWith(".." + path.sep) || path.isAbsolute(relativePath)) {
    return null;
  }

  return relativePath.split(path.sep).join("/");
}
