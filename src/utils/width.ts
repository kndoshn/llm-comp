const ANSI_PATTERN = /\x1b\[[0-9;]*m/g;

export function stripAnsi(str: string): string {
  return str.replace(ANSI_PATTERN, "");
}

function isFullwidthCodePoint(codePoint: number): boolean {
  return (
    codePoint >= 0x1100 &&
    (codePoint <= 0x115f ||
      codePoint === 0x2329 ||
      codePoint === 0x232a ||
      (codePoint >= 0x2e80 && codePoint <= 0xa4cf && codePoint !== 0x303f) ||
      (codePoint >= 0xac00 && codePoint <= 0xd7a3) ||
      (codePoint >= 0xf900 && codePoint <= 0xfaff) ||
      (codePoint >= 0xfe10 && codePoint <= 0xfe19) ||
      (codePoint >= 0xfe30 && codePoint <= 0xfe6f) ||
      (codePoint >= 0xff00 && codePoint <= 0xff60) ||
      (codePoint >= 0xffe0 && codePoint <= 0xffe6) ||
      (codePoint >= 0x1f300 && codePoint <= 0x1f64f) ||
      (codePoint >= 0x1f900 && codePoint <= 0x1f9ff) ||
      (codePoint >= 0x20000 && codePoint <= 0x3fffd))
  );
}

function isZeroWidthCodePoint(codePoint: number): boolean {
  if (codePoint <= 0x1f || (codePoint >= 0x7f && codePoint <= 0x9f)) return true;
  if (codePoint >= 0x200b && codePoint <= 0x200f) return true;
  if (codePoint >= 0x202a && codePoint <= 0x202e) return true;
  if (codePoint >= 0x2060 && codePoint <= 0x206f) return true;
  if (codePoint === 0x200d) return true;
  if (codePoint >= 0xfe00 && codePoint <= 0xfe0f) return true;
  if (codePoint >= 0x0300 && codePoint <= 0x036f) return true;
  if (codePoint >= 0x1ab0 && codePoint <= 0x1aff) return true;
  if (codePoint >= 0x1dc0 && codePoint <= 0x1dff) return true;
  if (codePoint >= 0x20d0 && codePoint <= 0x20ff) return true;
  if (codePoint >= 0xfe20 && codePoint <= 0xfe2f) return true;
  return false;
}

export function codePointWidth(codePoint: number): number {
  if (isZeroWidthCodePoint(codePoint)) return 0;
  if (isFullwidthCodePoint(codePoint)) return 2;
  return 1;
}

export function stringWidth(str: string): number {
  const clean = stripAnsi(str);
  let width = 0;
  for (let i = 0; i < clean.length; ) {
    const codePoint = clean.codePointAt(i);
    if (codePoint === undefined) break;
    width += codePointWidth(codePoint);
    i += codePoint > 0xffff ? 2 : 1;
  }
  return width;
}
