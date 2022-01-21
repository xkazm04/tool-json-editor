import { v4 as uuid } from "uuid";
import { FunctionParams } from "../providers/Buddy";

export const createUseCase = ({
  optionValue,
  label,
}: FunctionParams["input"]) => {
  const useCase = {
    id: uuid(),
    useCaseType: "input",
    label,
    value: optionValue,
    children: [],
  };
  return useCase;
};
