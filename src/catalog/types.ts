import { ProviderId } from "../types";

export interface ModelInfo {
  readonly id: string;
  readonly displayName: string;
  readonly tier: "flagship" | "standard" | "fast" | "legacy";
  readonly deprecated?: boolean;
}

export interface ProviderCatalog {
  readonly providerId: ProviderId;
  readonly displayName: string;
  readonly models: readonly ModelInfo[];
}
