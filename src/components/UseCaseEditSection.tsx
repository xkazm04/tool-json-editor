import React, { useEffect, useRef, useState } from "react";
import { BsFillXCircleFill } from "react-icons/bs";
import { useBuddy } from "../providers/Buddy";
import { BuddyBuilderType } from "../types";
import { Input } from "./Input";

interface OwnProps {
  input: BuddyBuilderType;
  closeEditSection: () => void;
}

export const UseCaseEditSection = ({
  input: { children, label: labelValue, id, value, useCaseType },
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
    { value: string; id: string; isEditing: boolean; label: string }[] | []
  >([]);
  const buddy = useBuddy();

  const setInputEditing = (id: string) => {
    const withEditedOption = [...options];
    const updatedOptions = withEditedOption.map((option) =>
      option.id === id ? { ...option, isEditing: true } : option
    );
    setOptions(updatedOptions);
  };

  const handleOptionChange = (
    e: React.FormEvent<HTMLInputElement>,
    id: string
  ) => {
    const withChangedOption = options.map((option) =>
      option.id === id
        ? { ...option, value: (e.target as HTMLInputElement).value }
        : option
    );
    setOptions(withChangedOption);
  };

  useEffect(() => {
    setOptions(
      children.map(({ id, value, label }) => ({
        value,
        id,
        isEditing: false,
        label,
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
    <div className='w-full min-h-[300px] bg-red-400 rounded-lg my-5 p-5 relative'>
      <div className='grid grid-cols-[70%_20%] gap-5'>
        {label.isEditing ? (
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
        ) : (
          <div className='my-2'>
            <label className='block text-sm text-white'>
              Label for group of inputs
            </label>
            <span className=''>{label.value}</span>
          </div>
        )}
        {label.isEditing ? (
          <button
            className='btn self-end '
            onClick={() => {
              buddy?.editUseCaseValue("label", id, label.value);
              setLabel((prev) => ({ ...prev, isEditing: false }));
            }}
          >
            Save
          </button>
        ) : (
          <button
            className='btn'
            onClick={() => setLabel((prev) => ({ ...prev, isEditing: true }))}
          >
            Edit
          </button>
        )}
      </div>
      <div className='divider'></div>
      {options.length > 0 &&
        options.map(({ label, value, id, isEditing }, index) => {
          return (
            <div key={index} className='grid grid-cols-[70%_20%]'>
              {isEditing ? (
                <>
                  <Input
                    labelText={label}
                    value={value}
                    onChange={(e) => handleOptionChange(e, id)}
                  />
                  <button
                    onClick={() =>
                      buddy?.editUseCaseValue(
                        "value",
                        id,
                        options[index]["value"]
                      )
                    }
                    className='btn justify-self-end self-end'
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className='mt-4'>
                    <label className='block text-sm text-white'>{label}</label>
                    <p className='block'>{value}</p>
                  </div>
                  <button
                    onClick={() => setInputEditing(id)}
                    className='btn justify-self-end self-end'
                  >
                    Edit
                  </button>
                </>
              )}
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
            <button type='submit' className='btn self-end my-2'>
              Confirm
            </button>
          </div>
        </form>
      )}
      <div>
        <button
          className='btn my-3'
          onClick={() => setNewInput((prev) => ({ ...prev, visible: true }))}
        >
          Add option
        </button>
      </div>
      <BsFillXCircleFill
        onClick={closeEditSection}
        className='absolute top-4 right-4 scale-150 cursor-pointer'
      />
    </div>
  );
};
