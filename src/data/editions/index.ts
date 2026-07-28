// Static edition registry. Add a folder per PAIO year and append it here.
import type { EditionConfig } from "./types";
import { paio2025 } from "./2025/config";
import { paio2026 } from "./2026/config";

export type { EditionConfig, TaskConfig, RawContestant } from "./types";

export const editionConfigs: EditionConfig[] = [paio2025, paio2026];
