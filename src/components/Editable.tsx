import React, { useState } from "react";
import { BuddyBuilderType } from "../types";
import { CodeSnippet } from "./CodeSnippet";

interface OwnProps {
  children: React.ReactNode;
  text: string;
  label: string;
  useCaseType: BuddyBuilderType["useCaseType"];
  onUseCaseSave?: () => void;
  onUseCaseDelete?: () => void;
}

export const Editable = ({
  children,
  text,
  label,
  useCaseType,
  onUseCaseSave,
  onUseCaseDelete,
}: OwnProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);

  const saveChange = () => {
    setIsEditing(false);
    onUseCaseSave && onUseCaseSave();
  };

  return (
    <div className='mb-5'>
      {isEditing ? (
        <div>
          <div>{children}</div>
          <div className='flex justify-between'>
            {onUseCaseSave && (
              <div className='my-3'>
                <button
                  className='btn justify-self-end self-end mr-2'
                  onClick={saveChange}
                >
                  Save
                </button>
                <button className='btn' onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className='mb-5 flex w-full justify-between'>
            {useCaseType === "input" ? (
              <div>
                <label className='font-bold text-white block my-1 '>
                  {label}
                </label>
                <span>{text}</span>
              </div>
            ) : (
              <div>
                <label className='font-bold text-white block mb-3'>
                  {label}
                </label>
                <CodeSnippet text={text} />
              </div>
            )}
            <div className='flex justify-between  my-2 self-end'>
              <button className='btn' onClick={() => setIsEditing(true)}>
                Edit
              </button>

              {onUseCaseDelete && (
                <button className='btn ml-2' onClick={onUseCaseDelete}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
