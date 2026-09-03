import assert from "node:assert/strict";
import test from "node:test";
import { formatCopyPayload } from "../src/core/copyPayload";

/**
 * 验证复制文本的段落顺序、1-based 行号和末尾换行。
 */
test("格式化路径、行范围和代码片段", () => {
  const payload = formatCopyPayload({
    filePath: "src/utils/helper.ts",
    startLine: 2,
    endLine: 4,
    code: "const a = 1;\nconst b = 2;\nreturn a + b;",
  });

  assert.equal(
    payload,
    "src/utils/helper.ts\n第 3-5 行\nconst a = 1;\nconst b = 2;\nreturn a + b;\n",
  );
});
