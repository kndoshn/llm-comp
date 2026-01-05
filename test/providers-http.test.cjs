const { describe, it, mock } = require("node:test");
const assert = require("node:assert");
const { safeJsonStringify } = require("../dist/providers/http");

describe("providers/http", () => {
  describe("safeJsonStringify", () => {
    it("stringifies objects with indentation", () => {
      const obj = { key: "value", nested: { a: 1 } };
      const result = safeJsonStringify(obj);
      assert.ok(result.includes('"key": "value"'));
      assert.ok(result.includes('"nested"'));
    });

    it("stringifies arrays", () => {
      const arr = [1, 2, 3];
      const result = safeJsonStringify(arr);
      assert.strictEqual(result, "[\n  1,\n  2,\n  3\n]");
    });

    it("stringifies primitives", () => {
      assert.strictEqual(safeJsonStringify("hello"), '"hello"');
      assert.strictEqual(safeJsonStringify(42), "42");
      assert.strictEqual(safeJsonStringify(true), "true");
      assert.strictEqual(safeJsonStringify(null), "null");
    });

    it("handles undefined", () => {
      assert.strictEqual(safeJsonStringify(undefined), undefined);
    });

    it("handles circular references", () => {
      const obj = { a: 1 };
      obj.self = obj;
      const result = safeJsonStringify(obj);
      assert.strictEqual(result, "[object Object]");
    });

    it("handles BigInt by falling back to String", () => {
      const big = BigInt(9007199254740991);
      const result = safeJsonStringify(big);
      assert.strictEqual(result, "9007199254740991");
    });
  });
});
