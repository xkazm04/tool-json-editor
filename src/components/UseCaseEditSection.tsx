import React, { useEffect, useRef, useState } from "react";
import { BsFillXCircleFill } from "react-icons/bs";
import { useBuddy } from "../providers/Buddy";
import { BuddyBuilderType } from "../types";
import { Editable } from "./Editable";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

interface OwnProps {
  input: BuddyBuilderType;
  closeEditSection: () => void;
}

export const UseCaseEditSection = ({
  input: { children, label: labelValue, id },
  closeEditSection,
}: OwnProps): JSX.Element => {
  const [label, setLabel] = useState<{
    value: string;
    isEditing: boolean;
  }>({ value: "", isEditing: false });
  const labelInputRef = useRef<HTMLInputElement | null>(null);
  const newInputRef = useRef<HTMLInputElement | null>(null);
  const [newInput, setNewInput] = useState({ visible: false, value: "" });
  const [options, setOptions] = useState<
    | {
        value: string;
        id: string;
        label: string;
        useCaseType: "input" | "code snippet";
      }[]
    | []
  >([]);
  const [codeSnippet, setCodeSnippet] = useState({ visible: false, value: "" });

  const buddy = useBuddy();

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

  return (
    <div className='max-w-screen-lg m-auto min-h-[300px] bg-red-400 rounded-lg my-5 p-5 relative'>
      <div className='grid grid-cols-[70%_20%] gap-5 '>
        <Editable
          useCaseType={"input"}
          text={label.value}
          label='Label for group of inputs'
          onUseCaseSave={() => {
            buddy?.editUseCaseValue("label", id, label.value);
            setLabel((prev) => ({ ...prev, isEditing: false }));
          }}
        >
          <Input
            ref={labelInputRef}
            labelText='Label for group of inputs'
            value={label.value}
            onChange={(e) =>
              setLabel((prev) => ({
                ...prev,
                value: (e.target as HTMLInputElement).value,
              }))
            }
          />
        </Editable>
      </div>
      <div className='divider'></div>
      {options.length > 0 &&
        options.map(({ label, value, id, useCaseType }, index) => {
          return (
            <div
              key={index}
              className='grid grid-cols-[60%_20%] p-2 gap-x-10 bg-red-300 my-2 rounded-xl'
            >
              <Editable
                useCaseType={useCaseType}
                onUseCaseSave={() =>
                  buddy?.editUseCaseValue("value", id, options[index]["value"])
                }
                label={label}
                text={value}
                onUseCaseDelete={() => buddy?.deleteUseCase(id, buddy?.buddy)}
              >
                {useCaseType === "input" ? (
                  <Input
                    labelText={label}
                    value={value}
                    onChange={(e) => handleOptionChange(e, id)}
                  />
                ) : (
                  <TextArea
                    value={value}
                    onChange={(e) => handleOptionChange(e, id)}
                  />
                )}
              </Editable>
            </div>
          );
        })}
      {newInput.visible && (
        <form
          onSubmit={() => {
            buddy?.addUseCaseOption("input", newInput.value, undefined, id);
            setNewInput((prev) => ({ ...prev, value: "", visible: false }));
          }}
        >
          <div className='flex items-center justify-between'>
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
            <div className='self-end'>
              <button
                disabled={newInput.value === ""}
                type='submit'
                className='btn '
              >
                Confirm
              </button>
              <button
                onClick={() =>
                  setNewInput((prev) => ({
                    ...prev,
                    value: "",
                    visible: false,
                  }))
                }
                className='btn ml-4'
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
      {codeSnippet.visible && (
        <div className='grid grid-cols-[70%_20%] gap-x-10'>
          <TextArea
            value={codeSnippet.value}
            onChange={(e) =>
              setCodeSnippet((prev) => ({
                ...prev,
                value: (e.target as HTMLTextAreaElement).value,
              }))
            }
          />
          <div className='justify-self-end self-end'>
            <button
              disabled={codeSnippet.value === ""}
              onClick={() => {
                buddy?.addUseCaseOption(
                  "code snippet",
                  codeSnippet.value,
                  undefined,
                  id,
                  () =>
                    setCodeSnippet((prev) => ({
                      ...prev,
                      visible: false,
                      value: "",
                    }))
                );
              }}
              type='submit'
              className='btn w-full '
            >
              Save
            </button>
            <button
              onClick={() =>
                setCodeSnippet((prev) => ({
                  ...prev,
                  visible: false,
                  value: "",
                }))
              }
              className='btn w-full mt-2'
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div>
        {(options.length > 0 && options[0]["useCaseType"] === "code snippet") ||
        codeSnippet.visible ||
        newInput.visible ? null : (
          <button
            className='btn my-3'
            onClick={() => setNewInput((prev) => ({ ...prev, visible: true }))}
          >
            Add option
          </button>
        )}

        {options?.length === 0 && !codeSnippet.visible && !newInput.visible && (
          <button
            className='btn my-3 ml-5'
            onClick={() =>
              setCodeSnippet((prev) => ({ ...prev, visible: true }))
            }
          >
            Add code snippet
          </button>
        )}
      </div>
      <BsFillXCircleFill
        onClick={closeEditSection}
        className='absolute top-4 right-4 scale-150 cursor-pointer'
      />
    </div>
  );
};
