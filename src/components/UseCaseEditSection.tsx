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
  input: { children, label, id, value, useCaseType },
  closeEditSection,
}: OwnProps): JSX.Element => {
  const [labelValue, setLabelValue] = useState<string>("");
  const labelInputRef = useRef<HTMLInputElement | null>(null);
  const [newInput, setNewInput] = useState({ visible: false, value: "" });
  const buddy = useBuddy();

  useEffect(() => {
    setLabelValue(label);
  }, [label]);

  return (
    <div className='w-full min-h-[300px] bg-red-400 rounded-lg my-5 p-5 relative'>
      <div className='grid grid-cols-[80%_20%]'>
        <Input
          ref={labelInputRef}
          labelText='Label for group of inputs'
          value={labelValue}
          onChange={(e) => setLabelValue((e.target as HTMLInputElement).value)}
        />
      </div>
      <div className='divider'></div>
      {children.map(({ label, value }, index) => {
        return <Input labelText={label} value={value} />;
      })}
      {newInput.visible && (
        <div className='flex items-center justify-between'>
          <Input
            value={newInput.value}
            onChange={(e) =>
              setNewInput((prev) => ({
                ...prev,
                value: (e.target as HTMLInputElement).value,
              }))
            }
          />
          <button
            className='btn self-end my-2'
            onClick={() => {
              buddy?.addUseCaseOption("input", newInput.value, undefined, id);
              setNewInput((prev) => ({ ...prev, value: "", visible: false }));
            }}
          >
            Confirm
          </button>
        </div>
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
