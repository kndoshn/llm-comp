# Model Catalog

**Last Updated:** January 5, 2026

This document lists the latest AI models from OpenAI, Anthropic, and Google (Gemini) available for use with llm-comp.

---

## OpenAI Models

### Flagship Models (Recommended)

| Model | Description | Context |
|-------|-------------|---------|
| `gpt-5.2` | Latest flagship model (GPT-5.2 family) | - |
| `gpt-5.2-pro` | Higher-accuracy GPT-5.2 variant (“smarter and more precise”) | - |
| `gpt-5.1` | Previous flagship model with configurable reasoning effort | - |
| `gpt-5` | Prior flagship reasoning model for coding and agentic tasks | - |
| `gpt-5-mini` | Faster, cost-efficient GPT-5 for well-defined tasks | - |
| `gpt-5-nano` | Fastest, most cost-efficient GPT-5 | - |

### O-Series Reasoning Models (Deprecated)

| Model | Description | Best For |
|-------|-------------|----------|
| `o3` | Powerful reasoning model (legacy, succeeded by GPT-5) | Coding, math, science, visual perception |
| `o3-pro` | Higher-compute version of `o3` | Complex problems requiring more reliable responses |
| `o3-mini` | Small model alternative to `o3` | Cost-sensitive reasoning tasks |
| `o4-mini` | Fast, cost-efficient reasoning model (legacy, succeeded by GPT-5 mini) | Fast math/coding/visual tasks |

### GPT-4.1 Series (Deprecated)

| Model | Description | Context |
|-------|-------------|---------|
| `gpt-4.1` | Smartest non-reasoning model (strong coding + instruction following) | 1M tokens |
| `gpt-4.1-mini` | Balanced performance and cost | 1M tokens |
| `gpt-4.1-nano` | Fastest, most affordable | 1M tokens |

### Legacy Models (Do not use)

| Model | Status |
|-------|--------|
| `gpt-4o` | Legacy / older general-purpose model |
| `gpt-4.5-preview` | Removed from API (Jul 14, 2025) |
| `gpt-4` | Legacy / older high-intelligence model |
| `o1-preview` | Removed from API (Jul 28, 2025) |
| `o1-mini` | Removed from API (Oct 27, 2025) |
| `codex-mini-latest` | Deprecated (removing Jan 16, 2026) |

---

## Anthropic Claude Models

### Latest Models (Claude 4.x Family)

| Model | Release Date | Description |
|-------|--------------|-------------|
| `claude-opus-4-5-20251101` | Nov 24, 2025 | (Recommended) Industry leader for coding, agents, computer use |
| `claude-sonnet-4-5-20250929` | Sep 29, 2025 | Strongest for complex agents; top-tier coding and computer use |
| `claude-opus-4-1-20250805` | Aug 5, 2025 | Focused on agentic tasks and real-world coding improvements |
| `claude-haiku-4-5-20251001` | Oct 15, 2025 | Fastest, most cost-efficient (near-frontier small model) |

### Previous Generation

| Model | Release Date | Description |
|-------|--------------|-------------|
| `claude-sonnet-4-20250514` | May 22, 2025 | Next-gen Claude 4 model (hybrid: fast + extended thinking) |
| `claude-opus-4-20250514` | May 22, 2025 | High-end Claude 4 model (hybrid: fast + extended thinking) |

### Deprecated/Retired Models

| Model | Status |
|-------|--------|
| `claude-3-opus-20240229` | Deprecated Jun 30, 2025 (retiring Jan 5, 2026) |
| `claude-3-7-sonnet-20250219` | Deprecated Oct 28, 2025 (retiring Feb 19, 2026) |
| `claude-3-5-haiku-20241022` | Deprecated Dec 19, 2025 (retiring Feb 19, 2026) |
| `claude-3-5-sonnet-20240620` | Retired Oct 28, 2025 |
| `claude-3-5-sonnet-20241022` | Retired Oct 28, 2025 |
| `claude-3-sonnet-20240229` | Retired Jul 21, 2025 |
| `claude-2.1` | Retired Jul 21, 2025 |

---


## Google Gemini Models

### Latest Models (Gemini 3.x Family)

| Model | Status | Description | Context |
|-------|--------|-------------|---------|
| `gemini-3-pro-preview` | Preview | Most intelligent Gemini model (reasoning-first, agentic + multimodal) | 1,048,576 input / 65,536 output |
| `gemini-3-flash-preview` | Preview | Balanced “Flash” model for speed/scale with frontier reasoning | 1,048,576 input / 65,536 output |

### Stable Production Models (Gemini 2.5 Family)

| Model | Status | Description | Context |
|-------|--------|-------------|---------|
| `gemini-2.5-pro` | Stable | State-of-the-art “thinking” model for complex reasoning/coding | 1,048,576 input / 65,536 output |
| `gemini-2.5-flash` | Stable | Best price-performance for low-latency + high-volume tasks | 1,048,576 input / 65,536 output |
| `gemini-2.5-flash-lite` | Stable | Fastest / most cost-efficient Gemini model for high throughput | 1,048,576 input / 65,536 output |

### Previous Generation (Gemini 2.0 Family)

| Model | Status | Description | Context |
|-------|--------|-------------|---------|
| `gemini-2.0-flash` | Latest / Alias | Second-generation workhorse (tool use, multimodal) | 1,048,576 input / 8,192 output |
| `gemini-2.0-flash-001` | Stable (pinned) | Pinned stable version for reproducibility | 1,048,576 input / 8,192 output |
| `gemini-2.0-flash-lite` | Latest / Alias | Smaller, lower-latency/cost “Flash-Lite” | 1,048,576 input / 8,192 output |
| `gemini-2.0-flash-lite-001` | Stable (pinned) | Pinned stable version for reproducibility | 1,048,576 input / 8,192 output |

### Notes

- Prefer **stable** model codes for production. `*-preview` / `*-exp` are subject to change and may be withdrawn.
- On **Vertex AI**, the “auto-updated aliases” (e.g., `gemini-2.0-flash`) automatically move to the latest stable version; pin `*-001` versions for reproducibility.
- Gemini 1.5 era public model IDs (for example `gemini-1.5-pro`, `gemini-1.5-flash`) have been shut down in the Gemini API.

---

## Recommended Model

### For Generation Tasks

| Use Case | Recommended Model |
|----------|-------------------|
| High quality output | `claude-opus-4-5-20251101` or `gpt-5.2-pro` or `gemini-2.5-pro` |
| Balanced cost/quality | `claude-sonnet-4-5-20250929` or `gpt-5.2` or `gpt-4.1` or `gemini-2.5-flash` |
| Fast/cheap | `claude-haiku-4-5-20251001` or `gpt-5-nano` or `gpt-4.1-nano` or `gemini-2.5-flash-lite` |

### For Refinement Tasks

| Use Case | Recommended Model |
|----------|-------------------|
| Complex reasoning | `gpt-5.2-pro` or `o3-pro` or `claude-opus-4-5-20251101` or `gemini-2.5-pro` |
| Standard refinement | `claude-sonnet-4-5-20250929` or `gpt-5.2` or `gemini-2.5-flash` |
| Fast iterative refinement | `claude-haiku-4-5-20251001` or `gpt-5-mini` or `o4-mini` or `gemini-2.5-flash-lite` |

---

## Sources

- [Gemini Models (Gemini API)](https://ai.google.dev/gemini-api/docs/models)
- [Gemini API Changelog](https://ai.google.dev/gemini-api/docs/changelog)
- [Vertex AI Generative AI Models](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models)
- [Vertex AI Model versions and lifecycle](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions)
- [OpenAI Models Documentation](https://platform.openai.com/docs/models)
- [OpenAI Deprecations](https://platform.openai.com/docs/deprecations)
- [Anthropic Claude Models Overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Anthropic Model Deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations)
- [Introducing GPT-5.2](https://openai.com/index/introducing-gpt-5-2/)
- [Introducing Claude 4](https://www.anthropic.com/news/claude-4)
- [Introducing Claude Opus 4.5](https://www.anthropic.com/news/claude-opus-4-5)
- [Introducing Claude Sonnet 4.5](https://www.anthropic.com/news/claude-sonnet-4-5)
- [Introducing Claude Haiku 4.5](https://www.anthropic.com/news/claude-haiku-4-5)
