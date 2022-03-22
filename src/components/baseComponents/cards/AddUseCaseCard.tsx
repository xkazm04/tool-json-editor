import React, { useEffect, useRef, useState } from 'react';
import { BsFillXCircleFill } from 'react-icons/bs';
import { useBuddy } from '../../../providers/Buddy';
import { BuddyBuilderType } from '../../../types';
import { Editable } from '../Editable';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { AddCodeSnippetCard } from './AddCodeSnippetCard';
import { createUseCase } from '../../../utils/createUseCase';
import { deepClone } from '../../../utils/deepClone';
import { createCodeSnippet } from '../../../utils/createCodeSnippet';

interface OwnProps {
  input: BuddyBuilderType;
  closeEditSection: () => void;
}

export interface CodeSnippetFields {
  visible: boolean;
  codeExample: string;
  description: string;
  chatbotId: string;
  linkToDocs: string;
}

export const UseCaseEditSection = ({
  input,
  closeEditSection,
}: OwnProps): JSX.Element => {
  const [currentUseCase, setCurrentUseCase] = useState<BuddyBuilderType>(input);

  const labelInputRef = useRef<HTMLInputElement | null>(null);
  const newInputRef = useRef<HTMLInputElement | null>(null);
  const [newInput, setNewInput] = useState({ visible: false, value: '' });

  const [codeSnippet, setCodeSnippet] = useState<CodeSnippetFields>({
    visible: false,
    codeExample: '',
    description: '',
    chatbotId: '',
    linkToDocs: '',
  });

  const buddy = useBuddy();

  const handleUseCaseDelete = (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete the use case?'
    );
    if (!confirmed) return;
    buddy?.deleteUseCase(id);
  };

  const handleCodeSnippetChange = (key: keyof BuddyBuilderType, value: any) => {
    const current = deepClone(currentUseCase);

    const codeSnippet = current.children[0];

    codeSnippet[key] = value as string &
      ('input' | 'code snippet') &
      (BuddyBuilderType[] | []);
    setCurrentUseCase(current);
  };

  const handleOptionChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    const current = deepClone(currentUseCase);
    const newValue = (e.target as HTMLInputElement).value;

    current.children.forEach((child) => {
      if (child.id === id) {
        child.value = newValue;
      }
    });

    setCurrentUseCase(current);
  };

  const handleOptionAdd = (optionType: 'code snippet' | 'input') => {
    const newOption =
      optionType === 'input'
        ? createUseCase({ optionValue: '', label: '' })
        : createCodeSnippet({
            description: '',
            value: '',
            chatbotID: '',
            label: '',
            linkToDocs: '',
          });

    const copied = deepClone(currentUseCase);
    copied.children.push(newOption as never);

    setCurrentUseCase(copied);
  };

  const handleUseCaseEdit = (id: string) => {
    if (!buddy?.buddy) return;

    const current = deepClone(buddy?.buddy);

    const queue = [];
    queue.push(current);

    while (queue.length > 0) {
      let first = queue.shift();
      if (id === first?.id) {
        first.label = currentUseCase.label;

        // replaces all old keys with new one
        Object.keys(currentUseCase).forEach((key) => {
          if (!first || !currentUseCase) return;
          const newValue = currentUseCase[key as keyof typeof currentUseCase];

          first[key as keyof typeof first] = newValue as string &
            ('input' | 'code snippet') &
            (BuddyBuilderType[] | []);
        });
      } else {
        first?.children.forEach((child) => {
          queue.push(child);
        });
      }
    }
    buddy?.setBuddy(current);
  };

  useEffect(() => {
    newInputRef.current?.focus();
  }, [newInput]);

  useEffect(() => {
    setCurrentUseCase(input);
  }, [input]);

  useEffect(() => {
    labelInputRef.current?.focus();
  }, []);

  const inputsAreValid = () => {
    const inputsValues = [];
    for (let [key, value] of Object.entries(codeSnippet)) {
      if (key !== 'chatbotId' && key !== 'linkToDocs') {
        inputsValues.push(value);
      }
    }
    return inputsValues.every((value) => value !== ''.trim());
  };
  useEffect(() => {
    setCurrentUseCase(input);
  }, []);

  return (
    <div className="max-w-screen-lg m-auto min-h-[300px] bg-[#FFFFFF08] my-5 p-5 relative">
      <div className="grid grid-cols-[1fr_10%] ">
        <Input
          ref={labelInputRef}
          labelText="Label"
          value={currentUseCase?.label}
          onChange={(e) =>
            setCurrentUseCase((prev) => ({
              ...prev,
              label: (e.target as HTMLInputElement).value,
            }))
          }
        />
      </div>
      <div className="divider"></div>
      {currentUseCase.children.map(
        ({ label, value, id, useCaseType }, index) => {
          return (
            <div key={index} className="grid grid-cols-[1fr_10%] gap-5">
              {useCaseType === 'input' ? (
                <>
                  <Input
                    labelText={label}
                    value={value}
                    onChange={(e) => handleOptionChange(e, id)}
                  />
                  <div className="self-end justify-self-end pb-4">
                    <DeleteIcon
                      onClick={() => handleUseCaseDelete(id)}
                      className="cursor-pointer"
                    />
                  </div>
                </>
              ) : (
                <AddCodeSnippetCard
                  id={input.id}
                  codeSnippet={currentUseCase.children[0]}
                  handleCodeSnippetChange={handleCodeSnippetChange}
                  setCodeSnippet={setCodeSnippet}
                />
              )}
            </div>
          );
        }
      )}
      <div className="flex justify-between my-5">
        <div>
          <div className="relative group">
            <PlusIcon />
            <div className="absolute top-5 left-0 hidden group-hover:flex group-hover:flex-col">
              {(currentUseCase.children.length > 0 &&
                currentUseCase.children[0]['useCaseType'] === 'code snippet') ||
              codeSnippet.visible ||
              (newInput.visible && newInput.value === ''.trim()) ? null : (
                <span onClick={() => handleOptionAdd('input')} className="py-1">
                  Option
                </span>
              )}
              {currentUseCase.children?.length === 0 &&
                !codeSnippet.visible &&
                !newInput.visible && (
                  <span
                    className="py-1"
                    onClick={() => handleOptionAdd('code snippet')}
                  >
                    Code
                  </span>
                )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="btn rounded-none hover:bg-transparent  text-[#FFFFFF66] bg-transparent border-none uppercase p-2 self-start cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => handleUseCaseEdit(input.id)}
            disabled={!inputsAreValid() && codeSnippet.visible}
            className="btn border-none  rounded-none hover:bg-green hover:text-[#2F3152] text-[#2F3152] uppercase p-2 bg-green self-start cursor-pointer"
          >
            Save changes
          </button>
        </div>
      </div>
      <CloseIcon
        onClick={closeEditSection}
        className="absolute top-4 right-4 scale-150 cursor-pointer"
      />
    </div>
  );
};
//
