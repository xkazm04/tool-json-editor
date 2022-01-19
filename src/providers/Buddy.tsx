import React, { useEffect, useState } from "react";
import { BuddyBuilderType } from "../types";
import { createUseCase } from "../utils/createUseCase";
import { getSchemas } from "../utils/schemaAPI";

interface SchemaAttributes {
  Title: string;
  Tree: BuddyBuilderType;
  createdAt: string;
  locale: string;
  publishedAt: string;
  updatedAt: string;
}

interface Schema {
  attributes: SchemaAttributes;
  id: number;
}

interface BuddyContextType {
  buddy: BuddyBuilderType | null;
  inputs: BuddyBuilderType[] | [];
  loadingSchema: boolean;
  schemas: Schema[];
  currentlyEditingSchema: number | null;
  setBuddy: React.Dispatch<React.SetStateAction<BuddyBuilderType | null>>;
  addUseCaseOption: (
    useCaseType: BuddyBuilderType["useCaseType"],
    optionValue: string,
    label?: string,
    useCaseID?: string,
    onFinish?: () => void
  ) => void;
  addRootUseCase: (
    value: string,
    useCaseType: BuddyBuilderType["useCaseType"],
    useCaseOptions: { value: string }[]
  ) => void;
  selectOption: (id: string, selectIndex: number) => void;
  editUseCaseValue: (
    valueType: "value" | "label",
    id: string,
    newValue: string
  ) => void;
  deleteUseCase: (id: string, buddy: BuddyBuilderType | null) => void;
  setActiveSchema: (id: number) => void;
}

export const BuddyContext = React.createContext<BuddyContextType | null>(null);

export const useBuddyContext = (): BuddyContextType => {
  const [loadingSchema, setLoadingSchema] = useState(false);
  const [buddy, setBuddy] = useState<BuddyBuilderType | null>(null);
  const [inputs, setInputs] = useState<BuddyBuilderType[] | []>([]);
  const [schemas, setSchemas] = useState<Schema[] | []>([]);
  const [currentlyEditingSchema, setCurrentlyEditingSchema] = useState<
    number | null
  >(null);

  useEffect(() => {
    setLoadingSchema(true);
    getSchemas().then((sch) => {
      sch && setSchemas(sch);
      setLoadingSchema(false);
    });
  }, []);

  const setActiveSchema = (id: number) => {
    const activeSchema = schemas.find((schema) => schema.id === id);

    if (activeSchema) {
      setBuddy(activeSchema.attributes.Tree);
      setCurrentlyEditingSchema(activeSchema.id);
    }
  };

  const deleteUseCase = (id: string, buddy: BuddyBuilderType | null) => {
    const deleteCase = (buddy: BuddyBuilderType | null) => {
      if (!id || !buddy) return;
      const current: any = buddy;

      for (let [key, value] of Object.entries(current)) {
        if (typeof key === "string") {
          current[key as keyof BuddyBuilderType] = value;
        }
        if (Array.isArray(value)) {
          current[key] = (value as BuddyBuilderType["children"])
            .filter((v) => v.id !== id)
            .map((v) => deleteCase(v));
        }
      }
      return current;
    };
    const withoutDeletedUseCase = deleteCase(buddy);
    setBuddy((prev) => ({ ...prev, ...withoutDeletedUseCase }));
  };

  const editUseCaseValue = (
    valueType: "value" | "label",
    id: string,
    newValue: string
  ) => {
    const edit = (buddy: BuddyBuilderType | null) => {
      if (!buddy) return;
      const current: any = buddy;

      for (let [key, value] of Object.entries(current)) {
        if (typeof key === "string") {
          if (current.id === id) {
            current[valueType as any] = newValue.trim();
          } else {
            current[key as keyof BuddyBuilderType] = value;
          }
        }
        if (Array.isArray(value)) {
          current[key] = value.map((v) => edit(v));
        }
      }
      return current;
    };
    const editedBuddy = edit(buddy);
    setBuddy((prev) => ({ ...prev, ...editedBuddy }));
  };

  const handlePreviousSelectChange = (selectIndex: number, id: string) => {
    const validInputs = inputs.slice(0, selectIndex + 1);
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

    if (!useCase || useCase.useCaseType === "code snippet") return;
    setInputs((prev) => [...prev, useCase]);
  };

  const updateInputs = (inputs: BuddyBuilderType[]) => {
    if ((buddy && inputs.length === 0) || inputs[0]["id"] !== buddy?.id) {
      setInputs([buddy as BuddyBuilderType]);
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
  console.log("inputs", inputs);
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
    label: string = "",
    useCaseID?: string,
    onFinish?: () => void
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
    onFinish && onFinish();
  };

  useEffect(() => {
    if (!buddy) return;
    updateInputs(inputs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buddy]);

  return {
    buddy,
    addUseCaseOption,
    addRootUseCase,
    inputs,
    selectOption,
    editUseCaseValue,
    deleteUseCase,
    loadingSchema,
    schemas,
    setActiveSchema,
    currentlyEditingSchema,
    setBuddy,
  };
};

export const useBuddy = (): BuddyContextType | null => {
  return React.useContext(BuddyContext);
};
