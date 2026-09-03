import assert from "node:assert/strict";
import test from "node:test";
import { getWorkspaceRelativePath } from "../src/core/workspacePath";

/**
 * 验证工作区内路径会被转换为统一斜杠的相对路径。
 */
test("生成工作区相对路径", () => {
  assert.equal(
    getWorkspaceRelativePath("/workspace", "/workspace/src/index.ts"),
    "src/index.ts",
  );
});

/**
 * 验证工作区外文件不会被伪装成工作区相对路径。
 */
test("工作区外路径返回 null", () => {
  assert.equal(getWorkspaceRelativePath("/workspace", "/other/index.ts"), null);
});
