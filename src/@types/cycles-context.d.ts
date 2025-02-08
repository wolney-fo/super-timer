import { NewCycleData } from "../contexts/CyclesContext";
import { Cycle } from "./cycle";

export type CyclesContextType = {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: NewCycleData) => void;
  interruptCurrentCycle: () => void;
};
