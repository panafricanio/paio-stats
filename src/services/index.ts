// Dependency wiring. Pages import `statsService` from here and never see the
// concrete data source. To move to a backend later, implement StatsDataSource
// (e.g. ApiDataSource) and swap the one line below — no page changes.
import { StatsService } from "./stats-service";
import { StaticDataSource } from "./static/static-data-source";

export const statsService = new StatsService(new StaticDataSource());

export type {
  EditionSummary,
  EditionRow,
  EditionView,
  ScoreRow,
  CountryDetail,
  ContestantAppearance,
  EditionTaskStats,
  TaskDetail,
} from "./stats-service";
