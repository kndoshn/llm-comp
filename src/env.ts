import fs from "fs";
import path from "path";

/**
 * Minimal .env loader (dotenv の代替). 依存を増やさないために自前実装。
 *
 * - 先頭/末尾の空白はトリム
 * - KEY=VALUE 形式
 * - VALUE がダブル/シングルクオートに囲まれていれば外す
 * - 既に process.env にあるキーは上書きしない（=環境変数を優先）
 */
export function loadDotEnv(cwd: string): void {
  const envPath = path.join(cwd, ".env");
  if (!fs.existsSync(envPath)) return;

  const text = fs.readFileSync(envPath, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq <= 0) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    // strip quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}
