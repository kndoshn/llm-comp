const assert = require("node:assert/strict");
const test = require("node:test");

const {
  ANSI,
  stripAnsi,
  visualLength,
  padEnd,
  padStart,
  center,
  progressBar,
  decodeKey,
} = require("../dist/utils/term.js");

test("stripAnsi and visualLength remove control codes", () => {
  const colored = `${ANSI.fgRed}hi${ANSI.reset}`;
  assert.equal(stripAnsi(colored), "hi");
  assert.equal(visualLength(colored), 2);
  assert.equal(visualLength("あい"), 4);
  assert.equal(visualLength("\ud83d\ude00"), 2);
});

test("pad helpers respect visual width", () => {
  const colored = `${ANSI.fgRed}hi${ANSI.reset}`;
  assert.equal(stripAnsi(padEnd(colored, 4, ".")), "hi..");
  assert.equal(stripAnsi(padStart(colored, 4, ".")), "..hi");
  assert.equal(stripAnsi(center("hi", 5, ".")), ".hi..");
});

test("progressBar clamps values and decodeKey maps input", () => {
  const bar = progressBar(1.5, 4, { filled: "#", empty: ".", color: "" });
  assert.equal(stripAnsi(bar), "####");

  const barWithPercent = progressBar(0.25, 8, {
    filled: "#",
    empty: ".",
    color: "",
    showPercent: true,
  });
  assert.equal(stripAnsi(barWithPercent), "##...... 25%");

  assert.equal(decodeKey(Buffer.from("\x03")), "ctrlC");
  assert.equal(decodeKey(Buffer.from("\x1b[B")), "down");
  assert.equal(decodeKey(Buffer.from("5")), "5");
  assert.equal(decodeKey(Buffer.from("x")), "unknown");
});
