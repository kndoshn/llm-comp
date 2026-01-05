import { ProviderId } from "./provider";

export interface ProviderRunConfig {
  enabled: boolean;
  model: string | string[];
  temperature?: number;
  max_output_tokens?: number;
  system?: string;
  timeout_ms?: number;
}

export interface AppConfig {
  app: {
    title: string;
    system: string;
    timeout_ms: number;
  };
  providers: Record<ProviderId, ProviderRunConfig>;
  ui: {
    mode: "tabbed" | "json";
    tab_labels: Record<ProviderId, string>;
  };
}
