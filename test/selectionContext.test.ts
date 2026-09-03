import assert from "node:assert/strict";
import test from "node:test";
import { getSelectedLineContext, TextDocumentLike } from "../src/core/selectionContext";

class TestDocument implements TextDocumentLike {
  readonly lineCount: number;

  constructor(private readonly lines: string[]) {
    this.lineCount = lines.length;
  }

  /**
   * 提供测试文档的指定行内容，模拟 VS Code 文档的最小接口。
   */
  lineAt(line: number): { readonly text: string } {
    return { text: this.lines[line] };
  }
}

/**
 * 验证半行选区会扩展为完整的起止行。
 */
test("提取完整起止行", () => {
  const result = getSelectedLineContext(
    new TestDocument(["第一行", "第二行", "第三行"]),
    {
      start: { line: 0 },
      end: { line: 1 },
      isEmpty: false,
    },
  );

  assert.deepEqual(result, {
    startLine: 0,
    endLine: 1,
    text: "第一行\n第二行",
  });
});

/**
 * 验证没有选区时不会生成复制内容。
 */
test("空选区返回 null", () => {
  const result = getSelectedLineContext(new TestDocument(["内容"]), {
    start: { line: 0 },
    end: { line: 0 },
    isEmpty: true,
  });

  assert.equal(result, null);
});
