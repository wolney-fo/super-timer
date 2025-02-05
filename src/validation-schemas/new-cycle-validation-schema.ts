import { z } from "zod";

export const newCycleValidationSchema = z.object({
  task: z.string().min(1, "Tasks must be named"),
  minutesAmount: z.number().int().min(5).max(60),
});

export type NewCycleValidationSchema = z.infer<typeof newCycleValidationSchema>;
