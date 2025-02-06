export type Cycle = {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
  finishedAt?: Date;
  interruptedAt?: Date;
};
