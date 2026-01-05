export interface HttpResult<T> {
  ok: boolean;
  status: number;
  data?: T;
  text?: string;
  isTimeout?: boolean;
}

export async function postJson<T>(
  url: string,
  headers: Record<string, string>,
  body: unknown,
  timeoutMs: number
): Promise<HttpResult<T>> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });

    const raw = await res.text();
    let parsed: unknown = undefined;
    try {
      parsed = raw ? JSON.parse(raw) : undefined;
    } catch {
      // ignore
    }

    if (!res.ok) {
      return { ok: false, status: res.status, data: parsed as T | undefined, text: raw };
    }
    return { ok: true, status: res.status, data: parsed as T | undefined, text: raw };
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        return { ok: false, status: 0, isTimeout: true };
      }
      return { ok: false, status: 0, text: err.message };
    }
    return { ok: false, status: 0, text: String(err) };
  } finally {
    clearTimeout(t);
  }
}

export function safeJsonStringify(x: unknown): string {
  try {
    return JSON.stringify(x, null, 2);
  } catch {
    return String(x);
  }
}
