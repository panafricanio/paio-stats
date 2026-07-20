// Task domain: the entity and its difficulty statistics.

export interface Task {
  slug: string;
  name: string;
  short: string;
  day: 1 | 2;
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
