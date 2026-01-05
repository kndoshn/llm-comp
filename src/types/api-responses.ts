// OpenAI API Response Types
export interface OpenAITextContent {
  text?: string;
  output_text?: string;
}

export interface OpenAIOutputItem {
  type?: string;
  content?: OpenAITextContent[];
}

export interface OpenAIChoice {
  message?: {
    content?: string;
  };
}

export interface OpenAIResponse {
  output_text?: string;
  output?: OpenAIOutputItem[];
  choices?: OpenAIChoice[];
}

// Claude API Response Types
export interface ClaudeContentBlock {
  text?: string;
  content?: string;
}

export interface ClaudeResponse {
  content?: ClaudeContentBlock[];
  completion?: string;
}

// Gemini API Response Types
export interface GeminiPart {
  text?: string;
}

export interface GeminiContent {
  parts?: GeminiPart[];
}

export interface GeminiCandidate {
  content?: GeminiContent;
  finishReason?: string;
}

export interface GeminiPromptFeedback {
  blockReason?: string;
}

export interface GeminiResponse {
  candidates?: GeminiCandidate[];
  promptFeedback?: GeminiPromptFeedback;
  text?: string;
}

// Token Usage Types
export interface OpenAIUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
}

export interface ClaudeUsage {
  input_tokens?: number;
  output_tokens?: number;
}

export interface GeminiUsageMetadata {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
}

export interface ErrorResponse {
  error?: {
    message?: string;
  };
  message?: string;
}

// Type Guards
export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

export function isOpenAIResponse(payload: unknown): payload is OpenAIResponse {
  if (!isObject(payload)) return false;
  const p = payload as Record<string, unknown>;
  return (
    typeof p.output_text === "string" ||
    Array.isArray(p.output) ||
    Array.isArray(p.choices)
  );
}

export function isClaudeResponse(payload: unknown): payload is ClaudeResponse {
  if (!isObject(payload)) return false;
  const p = payload as Record<string, unknown>;
  return Array.isArray(p.content) || typeof p.completion === "string";
}

export function isGeminiResponse(payload: unknown): payload is GeminiResponse {
  if (!isObject(payload)) return false;
  const p = payload as Record<string, unknown>;
  return (
    Array.isArray(p.candidates) ||
    isObject(p.promptFeedback) ||
    typeof p.text === "string"
  );
}
