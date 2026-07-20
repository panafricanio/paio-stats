// Task domain: the entity and its difficulty statistics.

export interface Task {
  slug: string;
  name: string;
  short: string;
  day: number; // which contest day this task belongs to (1-based)
  maxScore: number;
  pdf?: string;
}

export interface TaskStat {
  task: Task;
  participants: number;
  attempted: number;
  avg: number;
  avgPct: number;
  fullSolves: number;
  fullPct: number;
}
