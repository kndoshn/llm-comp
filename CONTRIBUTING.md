# Contributing

Thank you for your interest in contributing to llm-comp!

## Development Setup

### Prerequisites

- Node.js 20+
- Git

Version managers (optional):
- `nvm`: `nvm use` (uses `.nvmrc`)
- `asdf`: `asdf install` (uses `.tool-versions`)

### Clone and Install

```bash
git clone https://github.com/kndoshn/llm-comp.git
cd llm-comp
npm install
npm run build
```

### Git Hooks

Enable shared hooks in `.githooks/`:

```bash
git config core.hooksPath .githooks
```

| Hook | Action |
|------|--------|
| `pre-commit` | Runs `npm run lint` |
| `pre-push` | Runs `npm test` |

## Development Workflow

### Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run lint` | Type-check without emitting |
| `npm test` | Build and run all tests |

### Running Locally

```bash
npm run build
node dist/cli.js "your prompt"
# or
npx llm-comp "your prompt"
```

To run real provider calls, initialize config and API keys first (see [README.md](README.md)).

### Testing

Tests use Node.js built-in test runner:

```bash
npm test
```

Test files are in `test/` with `.test.cjs` extension.

## Project Structure

```
llm-comp/
├── src/
│   ├── cli.ts           # Entry point
│   ├── config/          # Configuration loading/merging
│   ├── catalog/         # Model catalog definitions
│   ├── providers/       # API clients (OpenAI, Claude, Gemini)
│   ├── persistence/     # Selection/results storage
│   ├── ui/
│   │   ├── selector/    # Model selection UI
│   │   └── tabbed/      # Response viewer UI
│   ├── types/           # TypeScript types
│   └── utils/           # Utilities (text, terminal)
├── test/                # Test files
├── bin/                 # CLI wrapper
└── dist/                # Build output (gitignored)
```

## Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Ensure tests pass: `npm test`
5. Commit with a descriptive message
6. Push and open a PR

## Code Style

- TypeScript strict mode
- No external dependencies except `yaml`
- Keep functions small and focused
- Use existing patterns in the codebase

## Adding a New Provider

1. Create `src/providers/<name>.ts` implementing `runProvider()`
2. Add provider to `src/providers/registry.ts`
3. Add models to `src/catalog/models.ts`
4. Update `src/types/provider.ts` with new provider ID
5. Add tests in `test/`

## Updating Models

Edit `src/catalog/models.ts` and update `MODEL_CATALOG.md` to keep them in sync.

## Questions?

Open an issue for questions or feature discussions.
