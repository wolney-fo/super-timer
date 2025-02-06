export type Cycle = {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
  interruptedAt?: Date;
};
