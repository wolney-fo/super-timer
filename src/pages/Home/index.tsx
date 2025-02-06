import { Play } from "phosphor-react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewCycleValidationSchema,
  newCycleValidationSchema,
} from "../../validation-schemas/new-cycle-validation-schema";
import { useEffect, useState } from "react";
import { Cycle } from "../../@types/cycle";
import { differenceInSeconds } from "date-fns";

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } =
    useForm<NewCycleValidationSchema>({
      resolver: zodResolver(newCycleValidationSchema),
      defaultValues: {
        task: "",
        minutesAmount: 5,
      },
    });

  const activeCycle = cycles.find((cycle) => activeCycleId === cycle.id);

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startedAt)
        );
      }, 1000);
    }
  }, [activeCycle]);

  function handleCreateNewCycle(data: NewCycleValidationSchema) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    };

    setCycles((cycles) => [...cycles, newCycle]);
    setActiveCycleId(id);

    reset();
  }

  const ACTIVE_CYCLE_SECONDS_AMOUNT = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0;
  const currentSeconds = activeCycle
    ? ACTIVE_CYCLE_SECONDS_AMOUNT - amountSecondsPassed
    : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  const isSubmitDisabled = !watch("task");

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Name your project"
            {...register("task")}
          />

          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
            <option value="Project 4" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutes</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
