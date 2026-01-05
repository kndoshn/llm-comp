// Timeouts
export const DEFAULT_TIMEOUT_MS = 60_000;
export const SPINNER_INTERVAL_MS = 80;

// Token limits
export const DEFAULT_MAX_OUTPUT_TOKENS = 800;
export const DEFAULT_TEMPERATURE = 0.2;

// Terminal
export const DEFAULT_TERMINAL_WIDTH = 80;
export const DEFAULT_TERMINAL_HEIGHT = 24;

// Error patterns that trigger fallback to next model
export const MODEL_ERROR_PATTERNS = [
  "model",
  "not found",
  "unknown",
  "unsupported parameter",
  "overloaded",
  "try again later",
] as const;
export const MODEL_FALLBACK_STATUS_CODES = [400, 404, 429, 503, 529] as const;

// Provider IDs
export const PROVIDER_IDS = ["openai", "claude", "gemini"] as const;

// Environment variables
export const ENV_SKIP_DOTENV = "LLM_COMP_SKIP_DOTENV";
export const ENV_CONFIG_PATH = "LLM_COMP_CONFIG";
