import React, { useEffect, useState } from "react";
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
  inputs: BuddyBuilderType[] | [];
  selectOption: (id: string, selectIndex: number) => void;
}

export const BuddyContext = React.createContext<BuddyContextType | null>(null);

export const useBuddyContext = (): BuddyContextType => {
  const [buddy, setBuddy] = useState<BuddyBuilderType | null>(null);
  const [inputs, setInputs] = useState<BuddyBuilderType[] | []>([]);

  const handlePreviousSelectChange = (selectIndex: number, id: string) => {
    const validInputs = inputs.slice(selectIndex, 1);
    const nextUseCase = findUseCase(id);
    nextUseCase && setInputs([...validInputs, nextUseCase]);
  };

  const selectOption = (id: string, selectIndex: number) => {
    const lastInput = inputs.length - 1;
    if (lastInput !== selectIndex) {
      handlePreviousSelectChange(selectIndex, id);
      return;
    }
    const useCase = findUseCase(id);
    if (!useCase) return;
    setInputs((prev) => [...prev, useCase]);
  };

  const updateInputs = (inputs: BuddyBuilderType[]) => {
    if (buddy && inputs.length === 0) {
      setInputs([buddy]);
    } else {
      const updatedInputs = inputs.map((input) => {
        let matchedInput = null;
        const current = buddy;
        const queue = [];
        queue.push(current);

        while (queue.length > 0) {
          const last = queue.shift();
          if (last?.id === input.id) {
            matchedInput = last;
          } else {
            last?.children.forEach((child) => queue.push(child));
          }
        }
        return matchedInput;
      });
      setInputs(updatedInputs as BuddyBuilderType[]);
    }
  };

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

  const findUseCase = (id: string): BuddyBuilderType | null => {
    let searched = null;
    let current = buddy;
    const queue = [];
    queue.push(current);

    while (queue.length > 0) {
      if (!current) return null;
      current = queue.shift() as BuddyBuilderType;
      if (current?.id === id) {
        searched = current;
      } else {
        current.children.forEach((child) => queue.push(child));
      }
    }
    return searched;
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

  useEffect(() => {
    if (!buddy) return;
    updateInputs(inputs);
  }, [buddy]);

  return { buddy, addUseCaseOption, addRootUseCase, inputs, selectOption };
};

export const useBuddy = (): BuddyContextType | null => {
  return React.useContext(BuddyContext);
};
