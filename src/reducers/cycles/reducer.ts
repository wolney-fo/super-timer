import { Cycle } from "../../@types/cycle";
import { ActionTypes } from "./actions";
import { produce } from "immer";

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedAt: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedAt: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };

    default:
      return state;
  }
}
