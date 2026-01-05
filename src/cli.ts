import { loadDotEnv } from "./env";
import { resolveConfig } from "./config";
import { initProjectFiles } from "./init";
import { runAll, runProviderWithModel } from "./providers/registry";
import { ProviderId } from "./types";
import { shouldSkipDotEnv, getHelpText } from "./cli-helpers";
import { TabbedUI } from "./ui/tabbed";
import { printJson } from "./ui/json";
import { MODEL_CATALOG } from "./catalog";
import { ModelSelector, SelectedModel } from "./ui/selector";
import { loadSelection, saveSelection, saveResults } from "./persistence";

function printHelp(): void {
  process.stdout.write(getHelpText() + "\n");
}

async function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data.trim()));
  });
}

async function main(): Promise<void> {
  const cwd = process.cwd();
  if (!shouldSkipDotEnv()) {
    loadDotEnv(cwd);
  }

  const argv = process.argv.slice(2);

  if (argv.length === 0 && process.stdin.isTTY) {
    printHelp();
    process.exit(1);
  }

  if (argv[0] === "init") {
    const r = initProjectFiles(cwd);
    if (r.created.length) {
      process.stdout.write(
        "Created:\n" + r.created.map((s) => `  - ${s}`).join("\n") + "\n"
      );
    }
    if (r.skipped.length) {
      process.stdout.write(
        "Skipped (already exists):\n" +
          r.skipped.map((s) => `  - ${s}`).join("\n") +
          "\n"
      );
    }
    process.stdout.write("\nNext: Add your API keys to .env\n");
    process.exit(0);
  }

  let prompt = argv.join(" ").trim();
  if (!prompt && !process.stdin.isTTY) {
    prompt = await readStdin();
  }

  if (!prompt) {
    printHelp();
    process.exit(1);
  }

  const resolved = resolveConfig(cwd);
  const cfg = resolved.config;

  // JSON mode or non-TTY: use old behavior with config defaults
  if (cfg.ui.mode === "json" || !process.stdout.isTTY) {
    const enabled: Record<ProviderId, boolean> = {
      openai: !!cfg.providers.openai.enabled,
      claude: !!cfg.providers.claude.enabled,
      gemini: !!cfg.providers.gemini.enabled,
    };
    const results = await runAll(prompt, cfg.providers, enabled);
    printJson(results);
    return;
  }

  // Interactive mode: show model selector
  const defaultSelections = loadSelection(cwd);
  const selector = new ModelSelector(MODEL_CATALOG, defaultSelections);
  const result = await selector.run();

  if (!result.confirmed || result.models.length === 0) {
    process.exit(0);
  }

  // Save selection for next time
  saveSelection(
    cwd,
    result.models.map((m) => ({ providerId: m.providerId, modelId: m.modelId }))
  );

  // Start TabbedUI with selected models
  const ui = new TabbedUI({
    title: cfg.app.title,
    prompt,
    models: result.models,
    onAllSettled: (states) => {
      saveResults(cwd, prompt, states);
    },
  });

  ui.start();

  // Launch parallel execution for each selected model
  for (const model of result.models) {
    runProviderWithModel(
      model.providerId,
      model.modelId,
      prompt,
      cfg.providers[model.providerId]
    )
      .then((r) => ui.updateFromResult(model, r))
      .catch((e) => ui.updateFromError(model, e));
  }

  await new Promise<void>(() => {});
}

main().catch((e) => {
  const msg = e instanceof Error ? e.stack || e.message : String(e);
  process.stderr.write(msg + "\n");
  process.exit(1);
});
