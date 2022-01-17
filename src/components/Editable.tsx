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
    <>
      {isEditing ? (
        <>
          <div>{children}</div>
          <div className='flex justify-between'>
            {onUseCaseSave && (
              <button
                className='btn justify-self-end self-end'
                onClick={saveChange}
              >
                Save
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div>
            {useCaseType === "input" ? (
              <>
                <label className='block text-sm text-white'>{label}</label>
                <span>{text}</span>
              </>
            ) : (
              <CodeSnippet text={text} />
            )}
          </div>
          <div className='flex justify-between'>
            <button className='btn' onClick={() => setIsEditing(true)}>
              Edit
            </button>
            {onUseCaseDelete && (
              <button className='btn ml-2' onClick={onUseCaseDelete}>
                Delete
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};
