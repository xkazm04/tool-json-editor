import React, { useEffect, useState } from 'react';
import { BuddyBuilderType } from '../types';
import { createCodeSnippet } from '../utils/createCodeSnippet';
import { createUseCase } from '../utils/createUseCase';
import { deepClone } from '../utils/deepClone';
import { getSchemas } from '../utils/schemaAPI';

interface SchemaAttributes {
  Title: string;
  tree: BuddyBuilderType;
  createdAt: string;
  locale: string;
  publishedAt: string;
  updatedAt: string;
}

type BuddyBuilderTypeKeys = keyof BuddyBuilderType;
type EditingValues = {
  [K in BuddyBuilderTypeKeys]: BuddyBuilderType[K];
};

interface Schema {
  attributes: SchemaAttributes;
  id: number;
}

export interface NotificationType {
  type: 'success' | 'error';
  message: string;
}

export type UseCaseType = 'code snippet' | 'input';

export type FunctionParams = {
  input: {
    optionValue: string;
    label: string;
  };
  'code snippet': {
    value: string;
    description: string;
    chatbotID: string;
    label: string;
    linkToDocs: string;
  };
};

interface BuddyContextType {
  buddy: BuddyBuilderType | null;
  inputs: BuddyBuilderType[] | [];
  loadingSchema: boolean;
  schemas: Schema[];
  currentlyEditingSchema: number | null;
  setBuddy: React.Dispatch<React.SetStateAction<BuddyBuilderType | null>>;

  addUseCaseOption: <T extends UseCaseType>(
    useCaseType: T,
    useCaseID: string,
    values: FunctionParams[T],
    onFinish?: () => void
  ) => void;
  selectOption: (id: string, selectIndex: number) => void;
  editUseCaseValue: (changingValue: Partial<EditingValues>, id: string) => void;
  deleteUseCase: (id: string) => void;
  setActiveSchema: (id: number) => void;
  notifications: NotificationType[];
  addNotification: (type: 'error' | 'success', message: string) => void;
  deleteNotifications: () => void;
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
  const [notifications, setNotifications] = React.useState<
    NotificationType[] | []
  >([]);

  const addNotification = (type: NotificationType['type'], message: string) => {
    setNotifications((prev) => [...prev, { type, message }]);
  };

  const deleteNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    setLoadingSchema(true);
    getSchemas()
      .then((schema) => {
        if (schema.data) {
          setSchemas(schema.data);
          return;
        }
        if (schema.data.error.status) {
          throw new Error();
        }
      })
      .catch((err) => {
        if (err) {
          addNotification(
            'error',
            'Honzo. Buddies were not found. Please try again'
          );
        }
      })
      .finally(() => setLoadingSchema(false));
  }, []);

  const setActiveSchema = (id: number) => {
    const activeSchema = schemas.find((schema) => schema.id === id);
    if (activeSchema) {
      setBuddy(activeSchema.attributes.tree);
      setCurrentlyEditingSchema(activeSchema.id);
    }
  };

  const deleteUseCase = (id: string) => {
    let current = deepClone(buddy as BuddyBuilderType);
    const queue = [];
    queue.push(current);

    while (queue.length > 0) {
      let сurrentNode = queue.shift();
      const filtered = сurrentNode?.children.filter((child) => child.id !== id);
      if (filtered?.length !== сurrentNode?.children.length) {
        (сurrentNode as any).children = filtered;
        setBuddy((prev) => ({ ...prev, ...current }));
        return;
      } else {
        сurrentNode?.children.forEach((child) => queue.push(child));
      }
    }
  };

  const editUseCaseValue = (
    changingValue: Partial<EditingValues>,
    id: string
  ) => {
    const edit = (buddy: BuddyBuilderType | null) => {
      if (!buddy) return;
      const current: any = buddy;

      for (let [key, value] of Object.entries(current)) {
        if (typeof value === 'string') {
          if (current.id === id && changingValue.hasOwnProperty(key)) {
            current[key] = (changingValue as any)[key].trim();
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

    if (!useCase || useCase.useCaseType === 'code snippet') return;
    setInputs((prev) => [...prev, useCase]);
  };

  const updateInputs = (inputs: BuddyBuilderType[]) => {
    if ((buddy && inputs.length === 0) || inputs[0]['id'] !== buddy?.id) {
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
    useCaseType: BuddyBuilderType['useCaseType'],
    useCaseID: string,
    values: FunctionParams['code snippet'] | FunctionParams['input'],
    onFinish?: () => void
  ) => {
    const newUseCaseOption: BuddyBuilderType =
      useCaseType === 'input'
        ? (createUseCase({
            optionValue: (values as FunctionParams['input']).optionValue,
            label: (values as FunctionParams['input']).label,
          }) as BuddyBuilderType)
        : (createCodeSnippet({
            description: (values as FunctionParams['code snippet']).description,
            chatbotID: (values as FunctionParams['code snippet']).chatbotID,
            label: values.label,
            value: (values as FunctionParams['code snippet']).value,
            linkToDocs: (values as FunctionParams['code snippet']).linkToDocs,
          }) as BuddyBuilderType);

    const current = deepClone(buddy as BuddyBuilderType);
    const queue = [];
    queue.push(current);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (currentNode?.id === useCaseID) {
        (currentNode.children as any).push(newUseCaseOption);
      } else {
        currentNode?.children.forEach((child) => queue.push(child));
      }
    }
    setBuddy(current);
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
    inputs,
    selectOption,
    editUseCaseValue,
    deleteUseCase,
    loadingSchema,
    schemas,
    setActiveSchema,
    currentlyEditingSchema,
    setBuddy,
    notifications,
    addNotification,
    deleteNotifications,
  };
};

export const useBuddy = (): BuddyContextType | null => {
  return React.useContext(BuddyContext);
};
