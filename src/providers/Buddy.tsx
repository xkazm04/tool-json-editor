import React, { useState } from "react";
import { BuddyBuilderType } from "../types";
import { createUseCase } from "../utils/createUseCase";

interface BuddyContextType {
  buddy: BuddyBuilderType | null;
  addUseCaseOption: (
    useCaseType: BuddyBuilderType["useCaseType"],
    optionValue: string,
    label?: string,
    useCaseID?: string
  ) => void;
  addRootUseCase: (
    value: string,
    useCaseType: BuddyBuilderType["useCaseType"],
    useCaseOptions: { value: string }[]
  ) => void;
}

export const BuddyContext = React.createContext<BuddyContextType | null>(null);

export const useBuddyContext = (): BuddyContextType => {
  const [buddy, setBuddy] = useState<BuddyBuilderType | null>(null);

  const addRootUseCase = (
    value: string,
    useCaseType: BuddyBuilderType["useCaseType"],
    useCaseOptions: { value: string }[]
  ) => {
    const useCase = createUseCase(useCaseType, value, undefined);
    setBuddy(buddy);
    const options = useCaseOptions.map((option) =>
      createUseCase(useCaseType, option.value)
    );
    useCase.children = options;
    setBuddy(useCase);
    return useCase;
  };

  const addUseCaseOption = (
    useCaseType: BuddyBuilderType["useCaseType"],
    optionValue: string,
    label: string = "default",
    useCaseID?: string
  ) => {
    const traverseBuddy = (buddy: BuddyBuilderType): BuddyBuilderType => {
      let current: any = buddy;

      for (let [key, value] of Object.entries(buddy)) {
        if (typeof value === "string") {
          current[key as keyof BuddyBuilderType] = value;
        }
        if (Array.isArray(value)) {
          const newUseCaseOption = createUseCase(
            useCaseType,
            optionValue,
            label
          );
          if (current.id === useCaseID) {
            current[key] = [
              ...(value as Array<BuddyBuilderType>),
              newUseCaseOption,
            ];
          } else {
            current[key as keyof BuddyBuilderType] = value.map(
              (child: BuddyBuilderType) => traverseBuddy(child)
            );
          }
        }
      }
      return current as BuddyBuilderType;
    };
    const updatedBuddy = traverseBuddy(buddy as BuddyBuilderType);
    setBuddy((prev) => ({ ...prev, ...updatedBuddy }));
  };

  return { buddy, addUseCaseOption, addRootUseCase };
};

export const useBuddy = (): BuddyContextType | null => {
  return React.useContext(BuddyContext);
};
