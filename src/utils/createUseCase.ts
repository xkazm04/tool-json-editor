import { v4 as uuid } from "uuid";
import { BuddyBuilderType } from "../types";

export const createUseCase = (
  type: BuddyBuilderType["useCaseType"],
  value: string,
  label: string = "default"
): BuddyBuilderType => {
  const useCase = {
    id: uuid(),
    useCaseType: type,
    label,
    value,
    children: [],
  };
  return useCase;
};
