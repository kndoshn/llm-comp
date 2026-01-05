import { execSync } from "child_process";

export interface ClipboardResult {
  success: boolean;
  message: string;
}

export interface IClipboardService {
  copy(text: string): ClipboardResult;
}

export class ClipboardService implements IClipboardService {
  copy(text: string): ClipboardResult {
    try {
      if (process.platform === "darwin") {
        execSync("pbcopy", { input: text });
      } else {
        execSync("xclip -selection clipboard", { input: text });
      }
      return { success: true, message: "Copied!" };
    } catch {
      const tool = process.platform === "darwin" ? "pbcopy" : "xclip";
      return { success: false, message: `Copy failed (${tool} not found)` };
    }
  }
}
