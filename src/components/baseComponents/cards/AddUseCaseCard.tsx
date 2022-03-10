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
  input: { children, label: labelValue, id },
  closeEditSection,
}: OwnProps): JSX.Element => {
  const [label, setLabel] = useState<{
    value: string;
    isEditing: boolean;
  }>({ value: '', isEditing: false });

  const labelInputRef = useRef<HTMLInputElement | null>(null);
  const newInputRef = useRef<HTMLInputElement | null>(null);
  const [newInput, setNewInput] = useState({ visible: false, value: '' });
  const [options, setOptions] = useState<
    | {
        value: string;
        id: string;
        label: string;
        useCaseType: 'input' | 'code snippet';
      }[]
    | []
  >([]);
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

  const handleOptionChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    const withChangedOption = options.map((option) => {
      return option.id === id
        ? {
            ...option,
            value: (e.target as HTMLInputElement | HTMLTextAreaElement).value,
          }
        : option;
    });
    setOptions(withChangedOption);
  };

  useEffect(() => {
    setOptions(
      children.map(({ id, value, label, useCaseType }) => ({
        value,
        id,
        isEditing: false,
        label,
        useCaseType,
      }))
    );
  }, [children]);

  useEffect(() => {
    newInputRef.current?.focus();
  }, [newInput]);

  useEffect(() => {
    labelInputRef.current?.focus();
  }, []);

  useEffect(() => {
    setLabel((prev) => ({ ...prev, value: labelValue }));
  }, [labelValue]);

  const inputsAreValid = () => {
    const inputsValues = [];
    for (let [key, value] of Object.entries(codeSnippet)) {
      if (key !== 'chatbotId' && key !== 'linkToDocs') {
        inputsValues.push(value);
      }
    }
    return inputsValues.every((value) => value !== ''.trim());
  };

  return (
    <div className="max-w-screen-lg m-auto min-h-[300px] bg-[#FFFFFF08] my-5 p-5 relative">
      <div className="grid grid-cols-[1fr_10%] ">
        <Input
          ref={labelInputRef}
          labelText="Label"
          value={label.value}
          onChange={(e) =>
            setLabel((prev) => ({
              ...prev,
              value: (e.target as HTMLInputElement).value,
            }))
          }
        />
        <div className="self-end justify-self-end pb-4">
          <DeleteIcon className="cursor-pointer" />
        </div>
      </div>
      <div className="divider"></div>
      {options.length > 0 &&
        options.map(({ label, value, id, useCaseType }, index) => {
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
                    <DeleteIcon className="cursor-pointer" />
                  </div>
                </>
              ) : (
                <TextArea
                  label=""
                  value={value}
                  onChange={(e) => handleOptionChange(e, id)}
                />
              )}
            </div>
          );
        })}
      {newInput.visible && (
        <div className="grid grid-cols-[1fr_10%] gap-5">
          <Input
            ref={newInputRef}
            value={newInput.value}
            onChange={(e) =>
              setNewInput((prev) => ({
                ...prev,
                value: (e.target as HTMLInputElement).value,
              }))
            }
          />
          <div className="self-end justify-self-end pb-4">
            <DeleteIcon
              onClick={() =>
                setNewInput((prev) => ({
                  ...prev,
                  value: '',
                  visible: false,
                }))
              }
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
      {codeSnippet.visible && (
        <AddCodeSnippetCard
          codeSnippet={codeSnippet}
          setCodeSnippet={setCodeSnippet}
        />
      )}
      <div className="flex justify-between my-5">
        <div>
          <div className="relative group">
            <PlusIcon />
            <div className="absolute top-5 left-0 hidden group-hover:flex group-hover:flex-col">
              {(options.length > 0 &&
                options[0]['useCaseType'] === 'code snippet') ||
              codeSnippet.visible ||
              (newInput.visible && newInput.value === ''.trim()) ? null : (
                <span
                  onClick={() =>
                    setNewInput((prev) => ({ ...prev, visible: true }))
                  }
                  className="py-1"
                >
                  Option
                </span>
              )}
              {options?.length === 0 &&
                !codeSnippet.visible &&
                !newInput.visible && (
                  <span
                    className="py-1"
                    onClick={() =>
                      setCodeSnippet((prev) => ({ ...prev, visible: true }))
                    }
                  >
                    Code
                  </span>
                )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="btn rounded-none hover:bg-transparent hover:text-[#FFFFFF66] text-[#FFFFFF66] bg-transparent border-none uppercase p-2 self-start cursor-pointer">
            Cancel
          </button>
          <button
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
