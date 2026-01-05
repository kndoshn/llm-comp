export function clone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T;
}

export function isPlainObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

const BLOCKED_KEYS = new Set(["__proto__", "prototype", "constructor"]);

export function deepMerge<T>(base: T, patch: unknown): T {
  if (!isPlainObject(patch)) return base;
  if (!isPlainObject(base)) return base;

  const out = { ...base } as Record<string, unknown>;
  for (const [k, v] of Object.entries(patch)) {
    if (BLOCKED_KEYS.has(k)) continue;
    if (v === undefined) continue;

    const baseVal = out[k];
    if (isPlainObject(v) && isPlainObject(baseVal)) {
      out[k] = deepMerge(baseVal, v);
    } else {
      out[k] = v;
    }
  }
  return out as T;
}
